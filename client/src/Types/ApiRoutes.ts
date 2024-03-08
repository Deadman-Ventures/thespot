import { API_ROOT } from "./Config";

export const ROOT = API_ROOT
export const CREATE_ITINERARY = `${ROOT}/itinerary/create`
export const CREATE_ACTIVITIES = `${ROOT}/activity/create-multiple`
export const GET_USER_ITINERARIES = `${ROOT}/itinerary/get-user-itineraries`
export const GET_ITINERARY = `${ROOT}/itinerary`
export const GET_ACTIVITIES_ON_ITINERARY = `${ROOT}/activity/all-on-itinerary`
export const UPDATE_ITINERARY_ACTIVITIES = `${ROOT}/activity/update-multiple`