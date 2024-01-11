import express from "express"
import bodyParser from "body-parser"
import { getActivity, getAllActivitiesInItinerary } from "../services/activity/activityService.js";

export const activityRoutes = express.Router()

activityRoutes.use((req, res, next) => {
  // do logging
  console.log(`Resource requested: ${req.method} ${req.originalUrl}`);
  next(); // make sure we go to the next routes and don't stop here
});

activityRoutes.use(bodyParser.urlencoded({ extended: true }));
activityRoutes.use(bodyParser.json());

activityRoutes.get('/:id', async (req, res) => {
  const id = req.params.id
  try {
    const itinerary = await getActivity(id)
    res.status(200).json({ success: true, itinerary: itinerary });
  }
  catch (error) {
    console.error(`Error getting activity: ${id} -- ${error}`)
    res.status(500).json({
      success: false,
      message: error.message || 'An error occured.',
      errors: error.error || [],
    });
  }
});

activityRoutes.get('/allForItinerary/:id', async (req, res) => {
  const id = req.params.id
  try {
    const activities = await getAllActivitiesInItinerary(id)
    res.status(200).json({ success: true, activities: activities });
  }
  catch (error) {
    console.error(`Error getting activities: ${id} -- ${error}`)
    res.status(500).json({
      success: false,
      message: error.message || 'An error occured.',
      errors: error.error || [],
    });
  }
})


