import { query } from "../db/index.js"
import { ActivityCategories } from "../types/activityCategories.js"

export type Activity = {
  id?: string
  itineraryId: string
  name: string
  category: ActivityCategories
  time?: string
  location?: string
  link?: string
  cost?: number
  notes?: string
}

export async function insertActivity(activity: Activity): Promise<Activity> {
  const res = await query(
    `insert into activities(itineraryId, name, category, time, location, link, 
        cost, notes) values($1, $2, $3, $4, $5, $6, $7, $8); `,
    [activity.itineraryId, activity.name, activity.category, activity.time, activity.location, activity.link,
    activity.cost, activity.notes])

  return res.rows[0] as unknown as Activity
}

export async function selectActivity(id: string): Promise<Activity> {
  const res = await query(
    `select * from activities a
    where a.id = $1`, [id])
  return res.rows[0] as unknown as Activity
}

export async function updateActivity(activity: Activity): Promise<Activity> {
  const res = await query(
    `update activities i
    set name=$1, category=$2, time=$3, location=$4, link=$5, cost=$6, notes=$7
    where i.id = $8`,
    [activity.name, activity.category, activity.time, activity.location, activity.link, activity.link, activity.cost, activity.notes]
  )
  return res.rows[0] as unknown as Activity ?? undefined
}

export async function selectAllActivitiesInItinerary(itineraryId: string): Promise<Activity[]> {
  const res = await query(
    `select * from activities a
    where a.itineraryId = $1`, [itineraryId])
  return res.rows as unknown as Activity[]
}