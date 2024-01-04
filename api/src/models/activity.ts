import { query } from "../db/index.js"

export type Activity = {
    id?: string
    itineraryId: string
    name: string
    category: string
    time?: string
    location?: string
    link?: string
    cost?: number
    notes?: string
}

export async function insertActivity(activity: Activity): Promise<Activity> {
  throw new Error()
}

export async function selectActivity(id: string): Promise<Activity> {
  throw new Error()
}

export async function updateActivity(itinerary: Activity): Promise<Activity> {
  throw new Error()
}