import * as express from 'express';
import * as bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import { initDb } from './db';

const app = express();

app.use(bodyParser.json());
app.use('/api', userRoutes);

const port = process.env.PORT || 3000;

initDb().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch((error) => {
  console.error('Failed to initialize database:', error);
});
