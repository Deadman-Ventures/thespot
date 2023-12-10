import express from 'express';
import { routes } from "./routes/index.js"
import { itineraryRoutes } from './routes/itineraryRoutes.js';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 3000;

app.use('/', routes)
app.use('/itinerary', itineraryRoutes)

app.use((err, req, res, next) => {
  res.status(err.status || 400).json({
    success: false,
    message: err.message || 'An error occured.',
    errors: err.error || [],
  });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Resource not found.' });
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});