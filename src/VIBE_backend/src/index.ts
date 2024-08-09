import "dotenv/config"; // Load environment variables
import { PrismaClient } from "@prisma/client";
import * as express from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import * as cors from "cors";

const prisma = new PrismaClient();

const allowedOrigins = ["http://localhost:3000"];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

const app = express();
app.use(cors(options));
app.use(express.json());

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "default_secret_key";

interface AuthenticatedRequest extends Request {
  userId?: number;
}

const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "No token provided" });

  jwt.verify(token, JWT_SECRET_KEY, (err, decoded: any) => {
    if (err)
      return res.status(403).json({ error: "Failed to authenticate token" });

    req.userId = decoded.userId;
    next();
  });
};

app.post("/register", async (req, res) => {
  const { communityName, userName, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        communityName,
        userName,
        email,
        password: hashedPassword,
      },
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: "User could not be created" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({ token, userId: user.id });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create Event
app.post(
  "/events",
  authenticateToken,
  async (req: AuthenticatedRequest, res) => {
    const { title, location, description, startDate, endDate, imageUrl } =
      req.body;

    try {
      const event = await prisma.event.create({
        data: {
          title,
          location,
          description,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          imageUrl,
          user: { connect: { id: req.userId! } },
        },
      });
      res.json(event);
    } catch (error) {
      res.status(400).json({ error: "Event could not be created" });
    }
  }
);

// Read All Events
app.get("/events", async (req, res) => {
  try {
    const events = await prisma.event.findMany();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Read Single Event by ID
app.get("/events/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const event = await prisma.event.findUnique({ where: { id: Number(id) } });

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update Event
app.put(
  "/events/:id",
  authenticateToken,
  async (req: AuthenticatedRequest, res) => {
    const { id } = req.params;
    const { title, location, description, startDate, endDate, imageUrl } =
      req.body;

    try {
      const event = await prisma.event.findUnique({
        where: { id: Number(id) },
      });

      if (!event || event.userId !== req.userId) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      const updatedEvent = await prisma.event.update({
        where: { id: Number(id) },
        data: {
          title,
          location,
          description,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          imageUrl,
        },
      });
      res.json(updatedEvent);
    } catch (error) {
      res.status(400).json({ error: "Event could not be updated" });
    }
  }
);

// Delete Event
app.delete(
  "/events/:id",
  authenticateToken,
  async (req: AuthenticatedRequest, res) => {
    const { id } = req.params;

    try {
      const event = await prisma.event.findUnique({
        where: { id: Number(id) },
      });

      if (!event || event.userId !== req.userId) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      await prisma.event.delete({ where: { id: Number(id) } });
      res.json({ message: "Event deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: "Event could not be deleted" });
    }
  }
);

// Like an event
app.post("/events/:id/like", authenticateToken, async (req: AuthenticatedRequest, res) => {
  const { id } = req.params;
  const userId = req.userId;

  console.log(`Request to like event ${id} by user ${userId}`);

  try {
    // Check if the like already exists
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_eventId: {
          userId: req.userId!,
          eventId: Number(id),
        },
      },
    });

    if (existingLike) {
      console.log("Event already liked");
      return res.status(400).json({ error: "Event already liked" });
    }

    // Create a new like
    const like = await prisma.like.create({
      data: {
        userId: req.userId!,
        eventId: Number(id),
      },
    });

    console.log("Like created:", like);
    res.json(like);
  } catch (error) {
    console.error("Error liking event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Unlike an event
app.delete(
  "/events/:id/unlike",
  authenticateToken,
  async (req: AuthenticatedRequest, res) => {
    const { id } = req.params;

    try {
      // Find the like
      const like = await prisma.like.findUnique({
        where: {
          userId_eventId: {
            userId: req.userId!,
            eventId: Number(id),
          },
        },
      });

      if (!like) {
        return res.status(404).json({ error: "Like not found" });
      }

      // Delete the like
      await prisma.like.delete({
        where: {
          userId_eventId: {
            userId: req.userId!,
            eventId: Number(id),
          },
        },
      });

      res.json({ message: "Event unliked successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Get likes count for an event
app.get("/events/:id/likes", async (req, res) => {
  const { id } = req.params;

  try {
    const likesCount = await prisma.like.count({
      where: { eventId: Number(id) },
    });

    res.json({ likesCount });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
  console.log(`JWT_SECRET_KEY: ${JWT_SECRET_KEY}`);
});
