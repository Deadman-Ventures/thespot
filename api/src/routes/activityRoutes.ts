import express from "express"
import bodyParser from "body-parser"
import { createNewActivities, getActivity, getAllActivitiesInItinerary, updateExistingActivity } from "../services/activity/activityService.js";
import { Activity } from "../models/activity.js";
import { verifySession } from "supertokens-node/recipe/session/framework/express/index.js";
import { SessionRequest } from "supertokens-node/framework/express/index.js";

export const activityRoutes = express.Router()

activityRoutes.use((req, res, next) => {
  // do logging
  console.log(`Resource requested: ${req.method} ${req.originalUrl}`);
  next(); // make sure we go to the next routes and don't stop here
});

activityRoutes.use(bodyParser.urlencoded({ extended: true }));
activityRoutes.use(bodyParser.json());

activityRoutes.get('/:id', verifySession(), async (req: SessionRequest, res) => {
  const id = req.params.id
  try {
    const activity = await getActivity(id)
    res.status(200).json(activity);
  }
  catch (error) {
    console.error(`Error getting activity: ${id} -- ${error}`)
    res.status(500).json({
      success: false,
      message: error.message || 'An error occurred.',
      errors: error.error || [],
    });
  }
});

activityRoutes.get('/all-on-itinerary/:id', verifySession(), async (req: SessionRequest, res) => {
  const id = req.params.id
  try {
    const activities = await getAllActivitiesInItinerary(id)
    res.status(200).json([...activities]);
  }
  catch (error) {
    console.error(`Error getting activities for itinerary: ${id} -- ${error}`)
    res.status(500).json({
      success: false,
      message: error.message || 'An error occurred.',
      errors: error.error || [],
    });
  }
})

activityRoutes.post('/create-multiple', verifySession(), async (req: SessionRequest, res) => {
  const newActivities = req.body as Activity[]
  try {
    const activities = await createNewActivities(newActivities)
    res.status(200).json(activities);
  }
  catch (error) {
    console.error(`Error creating activities: ${JSON.stringify(newActivities)} -- ${error}`)
    res.status(500).json({
      success: false,
      message: error.message || 'An error occurred.',
      errors: error.error || [],
    });
  }
})

activityRoutes.put('/update-multiple', verifySession(), async (req: SessionRequest, res) => {
  const newActivities = req.body as Activity[]
  try {
    const activities = newActivities.map(updateExistingActivity)
    res.status(200).json(activities);
  }
  catch (error) {
    console.error(`Error updating activities: ${JSON.stringify(newActivities)} -- ${error}`)
    res.status(500).json({
      success: false,
      message: error.message || 'An error occurred.',
      errors: error.error || [],
    });
  }
})


