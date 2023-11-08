import { Itinerary } from "../models";

export function validateItinerary(newItinerary: Itinerary): string | void {
    return
}

export function isValidItineraryName(name: string): boolean {
    return
}

export function isValidItineraryDates(startDate: Date, endDate: Date): boolean {
    return
}

// these functions will be much more useful when the auth is setup
export function isValidItineraryCreator(user: string): boolean {
    return
}

export function isValidItineraryEditors(name: string): boolean {
    return
}

export function isValidItineraryViewers(name: string): boolean {
    return
}