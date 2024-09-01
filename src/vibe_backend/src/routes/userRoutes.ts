import { Router, Request, Response } from "express";
import { getDb } from "../db";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { verifyToken } from "../middlewares/auth";

const userRoutes = Router();
const JWT_SECRET = process.env.JWT_SECRET_KEY || "vibe";

// Get all users (require token)
userRoutes.get("/", verifyToken, (req: Request, res: Response) => {
  const db = getDb();
  const result = db.exec("SELECT * FROM User;");
  res.json(result[0]?.values || []);
});

// Get a user by ID (require token)
userRoutes.get("/:id", verifyToken, (req: Request, res: Response) => {
  const { id } = req.params;
  const db = getDb();
  const result = db.exec("SELECT * FROM User WHERE id = ?;", [id]);
  if (result[0]?.values.length) {
    res.json(result[0].values[0]);
  } else {
    res.status(404).send("User not found");
  }
});

// Create a new user (does not require token, as it's for registration)
userRoutes.post("/", async (req: Request, res: Response) => {
  const { communityName, userName, email, password } = req.body;
  const db = getDb();

  try {
    console.log("Received data:", req.body);

    // Check if any fields are missing
    if (!communityName || !userName || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Hash the password before saving
    if (typeof password !== "string") {
      throw new Error("Password must be a string");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(
      "INSERT INTO User (communityName, userName, email, password) VALUES (?, ?, ?, ?);",
      [communityName, userName, email, hashedPassword]
    );
    res.status(201).send("User created");
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(400).send("Error creating user");
  }
});

// Login route
userRoutes.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body;
  const db = getDb();

  try {
    // Fetch the user by email
    const result = db.exec("SELECT * FROM User WHERE email = ?;", [email]);
    if (result[0]?.values.length) {
      const user = result[0].values[0];
      const userId = user[0]; // Assuming user[0] is the userId
      const storedPassword = user[4]; // Assuming user[4] is the hashed password

      // Compare the provided password with the stored hashed password
      bcrypt.compare(
        password,
        storedPassword?.toString() ?? "",
        (err, isMatch) => {
          if (isMatch) {
            // Generate JWT token
            const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
            res.json({ userId, token });
          } else {
            res.status(401).json({ message: "Invalid credentials" });
          }
        }
      );
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error logging in" });
  }
});

// Update a user by ID (require token)
userRoutes.put("/:id", verifyToken, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { communityName, userName, email, password } = req.body;
  const db = getDb();

  try {
    const check = db.exec("SELECT COUNT(*) as count FROM User WHERE id = ?;", [
      id,
    ]);
    const countString = check[0]?.values[0]?.[0] || "0";
    const count = parseInt(countString as string, 10);

    if (count > 0) {
      // Hash the password before updating
      const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
      db.run(
        "UPDATE User SET communityName = ?, userName = ?, email = ?, password = ? WHERE id = ?;",
        [communityName, userName, email, hashedPassword || undefined, id]
      );
      res.send("User updated");
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(400).send("Error updating user");
  }
});

// Delete a user by ID (require token)
userRoutes.delete("/:id", verifyToken, (req: Request, res: Response) => {
  const { id } = req.params;
  const db = getDb();
  try {
    const check = db.exec("SELECT COUNT(*) as count FROM User WHERE id = ?;", [
      id,
    ]);
    const countString = check[0]?.values[0]?.[0] || "0";
    const count = parseInt(countString as string, 10);

    if (count > 0) {
      db.run("DELETE FROM User WHERE id = ?;", [id]);
      res.send("User deleted");
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(400).send("Error deleting user");
  }
});

export default userRoutes;
