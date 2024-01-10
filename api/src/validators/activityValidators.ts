import { Activity } from "../models/activity.js";
import { selectItinerary } from "../models/itinerary.js";
import { ActivityCategories } from "../types/activityCategories.js";
import { ActivityValidationMessages } from "../types/validationMessages.js";

export function validateActivity(activity: Activity) {
  const errors = [
    validateActivityName(activity.name),
    validateActivityItineraryId(activity.itineraryId),
    validateActivityCategory(activity.category),
    validateActivityTime(activity.time)
  ]
  return errors.filter(e => e !== '').join(', ')
}

export function validateActivityName(name: string) {
  if (name.length > 50) {
    return ActivityValidationMessages.INVALID_NAME
  }
  return ''
}

export async function validateActivityItineraryId(itineraryId: string) {
  const itinerary = await selectItinerary(itineraryId)
  if (!itinerary) {
    return ActivityValidationMessages.INVALID_ITINERARY_ID
  }
  return ''
}

export function validateActivityCategory(category: ActivityCategories) {
  if (!Object.values(ActivityCategories).includes(category)) {
    return ActivityValidationMessages.INVALID_CATEGORY
  }
  return ''
}

export function validateActivityTime(time: string) {
  if (!time.match(/^\d{2}:\d{2}$/)) {
    return ActivityValidationMessages.INVALID_TIME
  }
  return ''
}

