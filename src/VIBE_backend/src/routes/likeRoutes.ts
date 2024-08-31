import { Router, Request, Response } from 'express';
import { getDb } from '../db';

const likeRoutes = Router();

// Get all likes
likeRoutes.get('/', (req: Request, res: Response) => {
  const db = getDb();
  const result = db.exec('SELECT * FROM Like;');
  res.json(result[0]?.values || []);
});

// Get a like by userId and eventId
likeRoutes.get('/:userId/:eventId', (req: Request, res: Response) => {
  const { userId, eventId } = req.params;
  const db = getDb();
  const result = db.exec('SELECT * FROM Like WHERE userId = ? AND eventId = ?;', [userId, eventId]);
  if (result[0]?.values.length) {
    res.json(result[0].values[0]);
  } else {
    res.status(404).send('Like not found');
  }
});

// Create a new like
likeRoutes.post('/', (req: Request, res: Response) => {
  const { userId, eventId } = req.body;
  const db = getDb();
  try {
    db.run('INSERT INTO Like (userId, eventId) VALUES (?, ?);', [userId, eventId]);
    res.status(201).send('Like added');
  } catch (error) {
    res.status(400).send('Error adding like');
  }
});

// Delete a like by userId and eventId
likeRoutes.delete('/:userId/:eventId', (req: Request, res: Response) => {
  const { userId, eventId } = req.params;
  const db = getDb();

  // Check if the like exists before deletion
  const check = db.exec('SELECT COUNT(*) as count FROM Like WHERE userId = ? AND eventId = ?;', [userId, eventId]);
  const countString = check[0]?.values[0]?.[0] || '0'; // Default to '0' if no value
  const count = parseInt(countString as string, 10); // Convert to a number

  if (count > 0) {
    // Perform the deletion
    db.run('DELETE FROM Like WHERE userId = ? AND eventId = ?;', [userId, eventId]);
    res.send('Like removed');
  } else {
    res.status(404).send('Like not found');
  }
});

export default likeRoutes;
