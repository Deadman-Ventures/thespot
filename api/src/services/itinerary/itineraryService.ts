import { DoesNotExistError, ValidationError } from "../../errors"
import { Itinerary, insertItinerary, itineraryExists, selectItinerary, updateItinerary } from "../../models"
import { validateItinerary } from "../../validators/itineraryValidators"

export function createNewItinarary(itinerary: Itinerary): Itinerary {
    const validationMessage = validateItinerary(itinerary)

    if (validationMessage) throw new ValidationError(validationMessage)

    return insertItinerary(itinerary)

}

export function getItinerary(id: string): Itinerary {
    const itinerary = selectItinerary(id)

    if (!itinerary) throw new DoesNotExistError(`No itinerary exists for ID: ${id}`)

    return itinerary
}

export function editItinerary(itinerary: Itinerary): Itinerary {
    if (!itineraryExists(itinerary.id)) throw new DoesNotExistError(`No itinerary exists for ID: ${itinerary.id}`)

    const validationMessage = validateItinerary(itinerary)

    if (validationMessage) throw new ValidationError(validationMessage)

    return updateItinerary(itinerary)
}