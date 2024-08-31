import { Router, Request, Response } from 'express';
import { getDb } from '../db';

const userRoutes = Router();

// Get all users
userRoutes.get('/', (req: Request, res: Response) => {
  const db = getDb();
  const result = db.exec('SELECT * FROM User;');
  res.json(result[0]?.values || []);
});

// Get a user by ID
userRoutes.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const db = getDb();
  const result = db.exec('SELECT * FROM User WHERE id = ?;', [id]);
  if (result[0]?.values.length) {
    res.json(result[0].values[0]);
  } else {
    res.status(404).send('User not found');
  }
});

// Create a new user
userRoutes.post('/', (req: Request, res: Response) => {
  const { communityName, userName, email, password } = req.body;
  const db = getDb();
  try {
    const result = db.run('INSERT INTO User (communityName, userName, email, password) VALUES (?, ?, ?, ?);', [communityName, userName, email, password]);
    res.status(201).send('User created');
  } catch (error) {
    res.status(400).send('Error creating user');
  }
});

// Update a user by ID
userRoutes.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { communityName, userName, email, password } = req.body;
  const db = getDb();
  try {
    const result = db.run('UPDATE User SET communityName = ?, userName = ?, email = ?, password = ? WHERE id = ?;', [communityName, userName, email, password, id]);
    if (result.changes > 0) {
      res.send('User updated');
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(400).send('Error updating user');
  }
});

// Delete a user by ID
userRoutes.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const db = getDb();
  try {
    const result = db.run('DELETE FROM User WHERE id = ?;', [id]);
    if (result.changes > 0) {
      res.send('User deleted');
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(400).send('Error deleting user');
  }
});

export default userRoutes;
