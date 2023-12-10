// import { routes } from "./index.js";
import express from "express"
import bodyParser from "body-parser"
import { Itinerary } from "../models/itinerary.js";
import { createNewItinarary, editItinerary, getItinerary } from "../services/itinerary/itineraryService.js";

export const itineraryRoutes = express.Router()

itineraryRoutes.use((req, res, next) => {
  // do logging
  console.log(`Resource requested: ${req.method} ${req.originalUrl}`);
  next(); // make sure we go to the next routes and don't stop here
});

itineraryRoutes.use(bodyParser.urlencoded({ extended: true }));
itineraryRoutes.use(bodyParser.json());

itineraryRoutes.get('get/:id', async (req, res) => {
    const id = req.params.id
    try {
        const itinerary = await getItinerary(id)
        res.status(200).json({ success: true, itinerary: itinerary });
    }
    catch (error) {
        console.error(`Error getting itinerary: ${id} -- ${error}`)
        res.status(500).json({
            success: false,
            message: error.message || 'An error occured.',
            errors: error.error || [],
        });
    }
});

itineraryRoutes.post('/create', async (req, res) => {
    const newItinerary = req.body as Itinerary
    try {
        const itinerary = await createNewItinarary(newItinerary)
        res.status(200).json({ success: true, itinerary: itinerary });
    }
    catch (error) {
        console.error(`Error creating itinerary: ${newItinerary} -- ${error}`)
        res.status(500).json({
            success: false,
            message: error.message || 'An error occured.',
            errors: error.error || [],
        });
    }
});

itineraryRoutes.post('edit', async (req, res) => {
    const newItinerary = req.body as Itinerary
    try {
        const itinerary = await editItinerary(newItinerary)
        res.status(200).json({ success: true, itinerary: itinerary });
    }
    catch (error) {
        console.error(`Error editing itinerary: ${newItinerary} -- ${error}`)
        res.status(500).json({
            success: false,
            message: error.message || 'An error occured.',
            errors: error.error || [],
        });
    }
});