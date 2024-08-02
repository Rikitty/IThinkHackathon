// import { Canister, query, text } from 'azle';

// export default Canister({
//     greet: query([text], text, (name) => {
//         return `Hello, ${name}!`;
//     })
// })

import 'dotenv/config'; // Load environment variables
import { PrismaClient } from '@prisma/client';
import * as express from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'default_secret_key';

app.post('/register', async (req, res) => {
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
    res.status(400).json({ error: 'User could not be created' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET_KEY, {
      expiresIn: '1h',
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
  console.log(`JWT_SECRET_KEY: ${JWT_SECRET_KEY}`); // Debug the environment variable
});
