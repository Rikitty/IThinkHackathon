import { Router, Request, Response } from 'express';
import { getDb } from '../db';

const eventRoutes = Router();

// Get all events
eventRoutes.get('/', (req: Request, res: Response) => {
  const db = getDb();
  const result = db.exec('SELECT * FROM Event;');
  res.json(result[0]?.values || []);
});

// Get an event by ID
eventRoutes.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const db = getDb();
  const result = db.exec('SELECT * FROM Event WHERE id = ?;', [id]);
  if (result[0]?.values.length) {
    res.json(result[0].values[0]);
  } else {
    res.status(404).send('Event not found');
  }
});

// Create a new event
eventRoutes.post('/', (req: Request, res: Response) => {
  console.log(req.body); // Add this line to see the received data

  const { title, location, description, startDate, endDate, imageUrl, userId } = req.body;
  const db = getDb();
  try {
    db.run('INSERT INTO Event (title, location, description, startDate, endDate, imageUrl, userId) VALUES (?, ?, ?, ?, ?, ?, ?);', 
      [title, location, description, startDate, endDate, imageUrl, userId]);
    res.status(201).send('Event created');
  } catch (error) {
    res.status(400).send('Error creating event');
  }
});


// Update an event by ID
eventRoutes.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, location, description, startDate, endDate, imageUrl } = req.body;
  const db = getDb();
  try {
    const check = db.exec('SELECT COUNT(*) as count FROM Event WHERE id = ?;', [id]);
    const countString = check[0]?.values[0]?.[0] || '0';
    const count = parseInt(countString as string, 10);

    if (count > 0) {
      db.run('UPDATE Event SET title = ?, location = ?, description = ?, startDate = ?, endDate = ?, imageUrl = ? WHERE id = ?;', 
        [title, location, description, startDate, endDate, imageUrl, id]);
      res.send('Event updated');
    } else {
      res.status(404).send('Event not found');
    }
  } catch (error) {
    res.status(400).send('Error updating event');
  }
});

// Delete an event by ID
eventRoutes.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const db = getDb();
  try {
    const check = db.exec('SELECT COUNT(*) as count FROM Event WHERE id = ?;', [id]);
    const countString = check[0]?.values[0]?.[0] || '0';
    const count = parseInt(countString as string, 10);

    if (count > 0) {
      db.run('DELETE FROM Event WHERE id = ?;', [id]);
      res.send('Event deleted');
    } else {
      res.status(404).send('Event not found');
    }
  } catch (error) {
    res.status(400).send('Error deleting event');
  }
});

export default eventRoutes;
