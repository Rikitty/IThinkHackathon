import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import userRoutes from './routes/userRoutes';
import eventRoutes from './routes/eventRoutes'; // Import event routes
import likeRoutes from './routes/likeRoutes'; // Import like routes
import { initDb } from './db';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', userRoutes); // Prefix user routes with /api/users
app.use('/api/events', eventRoutes); // Prefix event routes with /api/events
app.use('/api/likes', likeRoutes); // Prefix like routes with /api/likes

const port = process.env.PORT || 3001;

initDb().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch((error) => {
  console.error('Failed to initialize database:', error);
});
