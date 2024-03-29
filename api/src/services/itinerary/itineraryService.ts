import { DoesNotExistError, ValidationError } from "../../errors/index.js"
import { Itinerary, insertItinerary, selectItinerary, updateItinerary } from "../../models/itinerary.js"
import { validateItinerary } from "../../validators/itineraryValidators.js"

export async function createNewItinerary(itinerary: Itinerary): Promise<Itinerary> {
  const validationMessage = validateItinerary(itinerary)

  if (validationMessage) throw new ValidationError(validationMessage)

  return await insertItinerary(itinerary)
}

export async function getItinerary(id: string): Promise<Itinerary> {
  const itinerary = await selectItinerary(id)

  if (!itinerary) throw new DoesNotExistError(`No itinerary exists for ID: ${id}`)

  return itinerary
}

export async function editItinerary(itinerary: Itinerary): Promise<Itinerary> {
  if (!await selectItinerary(itinerary.id)) throw new DoesNotExistError(`No itinerary exists for ID: ${itinerary.id}`)

  const validationMessage = validateItinerary(itinerary)

  if (validationMessage) throw new ValidationError(validationMessage)

  return await updateItinerary(itinerary)
}