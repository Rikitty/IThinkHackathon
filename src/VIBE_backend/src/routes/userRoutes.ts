import { Router, Request, Response } from 'express';
import { getDb } from '../db';
import { verifyToken } from '../middlewares/auth'; // Import the middleware

const userRoutes = Router();

// Get all users (require token)
userRoutes.get('/', verifyToken, (req: Request, res: Response) => {
  const db = getDb();
  const result = db.exec('SELECT * FROM User;');
  res.json(result[0]?.values || []);
});

// Get a user by ID (require token)
userRoutes.get('/:id', verifyToken, (req: Request, res: Response) => {
  const { id } = req.params;
  const db = getDb();
  const result = db.exec('SELECT * FROM User WHERE id = ?;', [id]);
  if (result[0]?.values.length) {
    res.json(result[0].values[0]);
  } else {
    res.status(404).send('User not found');
  }
});

// Create a new user (does not require token, as it's for registration)
userRoutes.post('/', (req: Request, res: Response) => {
  const { communityName, userName, email, password } = req.body;
  const db = getDb();
  try {
    db.run('INSERT INTO User (communityName, userName, email, password) VALUES (?, ?, ?, ?);', [communityName, userName, email, password]);
    res.status(201).send('User created');
  } catch (error) {
    res.status(400).send('Error creating user');
  }
});

// Update a user by ID (require token)
userRoutes.put('/:id', verifyToken, (req: Request, res: Response) => {
  const { id } = req.params;
  const { communityName, userName, email, password } = req.body;
  const db = getDb();
  try {
    const check = db.exec('SELECT COUNT(*) as count FROM User WHERE id = ?;', [id]);
    const countString = check[0]?.values[0]?.[0] || '0';
    const count = parseInt(countString as string, 10);

    if (count > 0) {
      db.run('UPDATE User SET communityName = ?, userName = ?, email = ?, password = ? WHERE id = ?;', 
        [communityName, userName, email, password, id]);
      res.send('User updated');
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(400).send('Error updating user');
  }
});

// Delete a user by ID (require token)
userRoutes.delete('/:id', verifyToken, (req: Request, res: Response) => {
  const { id } = req.params;
  const db = getDb();
  try {
    const check = db.exec('SELECT COUNT(*) as count FROM User WHERE id = ?;', [id]);
    const countString = check[0]?.values[0]?.[0] || '0';
    const count = parseInt(countString as string, 10);

    if (count > 0) {
      db.run('DELETE FROM User WHERE id = ?;', [id]);
      res.send('User deleted');
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(400).send('Error deleting user');
  }
});

export default userRoutes;
