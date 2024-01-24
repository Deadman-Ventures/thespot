import { query } from "../db/index.js"
import { ActivityCategories } from "../types/activityCategories.js"
import { v4 as uuid } from 'uuid'

export type Activity = {
  id?: string
  itineraryId: string
  name: string
  category: ActivityCategories
  date: string
  time: string
  location?: string
  link?: string
  cost?: number
  notes?: string
}

function convertQueryResultToActivity(row: any): Activity {
  return row ? {
    id: row.id,
    itineraryId: row.itineraryid,
    name: row.name,
    category: row.category,
    date: row.date,
    time: row.time,
    location: row.location,
    link: row.link,
    cost: row.cost,
    notes: row.notes
  } : undefined
}

export async function insertActivity(activity: Activity): Promise<Activity> {
  const res = await query(
    `insert into activities(id, itineraryid, name, category, location, link, 
        cost, notes, date, time) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)  returning *; `,
    [uuid(), activity.itineraryId, activity.name, activity.category, activity.location, activity.link,
    activity.cost, activity.notes, activity.date, activity.time])

  return convertQueryResultToActivity(res.rows[0])
}

export async function selectActivity(id: string): Promise<Activity> {
  const res = await query(
    `select * from activities a
    where a.id = $1`, [id])
  return convertQueryResultToActivity(res.rows[0])
}

export async function updateActivity(activity: Activity): Promise<Activity> {
  const res = await query(
    `update activities i
    set name=$1, category=$2, location=$3, link=$4, cost=$5, notes=$6, date=$7, time=$8
    where i.id = $9`,
    [activity.name, activity.category, activity.location, activity.link, activity.cost, activity.notes,
    activity.date, activity.time, activity.id]
  )
  return convertQueryResultToActivity(res.rows[0])
}

export async function selectAllActivitiesInItinerary(itineraryId: string): Promise<Activity[]> {
  const res = await query(
    `select * from activities a
    where a.itineraryId = $1`, [itineraryId])
  return res.rows.map(convertQueryResultToActivity)
}