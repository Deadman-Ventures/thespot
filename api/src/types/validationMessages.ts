export enum ItineraryValidationMessages {
    INVALID_NAME = 'Name is invalid. Must be less than 50 characters.',
    INVALID_DATE_RANGE = 'Start date must be before end date.'
}

export enum ActivityValidationMessages{
  INVALID_NAME = 'Activity name must be less than 50 characters',
  INVALID_ITINERARY_ID = 'Itinerary ID is invalid',
  INVALID_CATEGORY = 'Activity category is invalid',
  INVALID_TIME = 'Activity time is invalid'  
}