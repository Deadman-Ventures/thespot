import { Itinerary } from "../models/itinerary.js";
import { ItineraryValidationMessages } from "../types/validationMessages.js";

export function validateItinerary(newItinerary: Itinerary): string {
  let errors = ''
  if (!isValidItineraryName(newItinerary.name)) {
    errors = errors + ItineraryValidationMessages.INVALID_NAME
  }
  if (!isValidItineraryDates(new Date(newItinerary.startDate), new Date(newItinerary.endDate))) {
    errors = errors + ItineraryValidationMessages.INVALID_DATE_RANGE
  }
  return errors
}

export function isValidItineraryName(name: string): boolean {
  return name.length <= 50
}

export function isValidItineraryDates(startDate: Date, endDate: Date): boolean {
  return startDate <= endDate
}