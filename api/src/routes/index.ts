import express from "express"
import bodyParser from "body-parser"

export const routes = express.Router()

routes.use(bodyParser.urlencoded({ extended: true }));
routes.use(bodyParser.json());

routes.use((req, res, next) => {
    // do logging
    console.log(`Resource requested: ${req.method} ${req.originalUrl}`);
    next(); // make sure we go to the next routes and don't stop here
  });
  
routes.get('/', (req, res) => {
    res.status(200).json({ success: true, message: 'Hello world!' });
});

