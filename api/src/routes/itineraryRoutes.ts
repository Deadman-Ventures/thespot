import express from "express"
import bodyParser from "body-parser"
import { Itinerary } from "../models/itinerary.js";
import { createNewItinerary, editItinerary, getItinerariesByUser, getItinerary } from "../services/itinerary/itineraryService.js";
import { verifySession } from "supertokens-node/recipe/session/framework/express/index.js";
import { SessionRequest } from "supertokens-node/framework/express/index.js";

export const itineraryRoutes = express.Router()

itineraryRoutes.use((req, res, next) => {
  // do logging
  console.log(`Resource requested: ${req.method} ${req.originalUrl}`);
  next(); // make sure we go to the next routes and don't stop here
});

itineraryRoutes.use(bodyParser.urlencoded({ extended: true }));
itineraryRoutes.use(bodyParser.json());

itineraryRoutes.get('/:id', verifySession(), async (req: SessionRequest, res) => {
  const id = req.params.id
  try {
    const itinerary = await getItinerary(id)
    res.status(200).json(itinerary);
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

itineraryRoutes.get('/get-user-itineraries/:userId', verifySession(), async (req: SessionRequest, res) => {
  const userId = req.params.userId
  try {
    const itineraries = await getItinerariesByUser(userId)
    res.status(200).json(itineraries);
  }
  catch (error) {
    console.error(`Error getting itineraries for user: ${userId} -- ${error}`)
    res.status(500).json({
      success: false,
      message: error.message || 'An error occured.',
      errors: error.error || [],
    });
  }
});

itineraryRoutes.post('/create', verifySession(), async (req: SessionRequest, res) => {
  const newItinerary = req.body as Itinerary
  try {
    const itinerary = await createNewItinerary(newItinerary)
    res.status(200).json(itinerary);
  }
  catch (error) {
    console.error(`Error creating itinerary: ${JSON.stringify(newItinerary)} -- ${error}`)
    res.status(500).json({
      success: false,
      message: error.message || 'An error occured.',
      errors: error.error || [],
    });
  }
});

itineraryRoutes.post('edit', verifySession(), async (req: SessionRequest, res) => {
  const newItinerary = req.body as Itinerary
  try {
    const itinerary = await editItinerary(newItinerary)
    res.status(200).json(itinerary);
  }
  catch (error) {
    console.error(`Error editing itinerary: ${JSON.stringify(newItinerary)} -- ${error}`)
    res.status(500).json({
      success: false,
      message: error.message || 'An error occured.',
      errors: error.error || [],
    });
  }
});