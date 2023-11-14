import { routes } from ".";
import { Itinerary } from "../models";
import { createNewItinarary, editItinerary, getItinerary } from "../services/itinerary/itineraryService";

routes.get('/itineraries/get/:id', async (req, res) => {
    const id = req.params.id
    try {
        const itinerary = await getItinerary(id)
        res.status(200).json({ success: true, itinerary: itinerary });
    }
    catch (error) {
        console.error(`Error getting itinerary: ${id} -- ${error}`)
    }
});

routes.post('/itineraries/create', async (req, res) => {
    const newItinerary = req.body as Itinerary
    try {
        const itinerary = await createNewItinarary(newItinerary)
        res.status(200).json({ success: true, itinerary: itinerary });
    }
    catch (error) {
        console.error(`Error creating itinerary: ${newItinerary} -- ${error}`)
    }
});

routes.post('/itineraries/edit', async (req, res) => {
    const newItinerary = req.body as Itinerary
    try {
        const itinerary = await editItinerary(newItinerary)
        res.status(200).json({ success: true, itinerary: itinerary });
    }
    catch (error) {
        console.error(`Error editing itinerary: ${newItinerary} -- ${error}`)
    }
});