import { Itinerary } from "../models";
import { ItineraryValidationMessages } from "../types";

export function validateItinerary(newItinerary: Itinerary): string {
    let errors = ''
    if (!isValidItineraryName(newItinerary.name)) errors = errors + ItineraryValidationMessages.INVALID_NAME
    if (!isValidItineraryDates(newItinerary.startDate, newItinerary.endDate)) errors = errors + ItineraryValidationMessages.INVALID_DATE_RANGE
    return errors
}

export function isValidItineraryName(name: string): boolean {
    return name.length <= 50
}

export function isValidItineraryDates(startDate: Date, endDate: Date): boolean {
    return startDate <= endDate
}