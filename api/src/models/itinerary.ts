import { query } from "../db/index.js"
import { v4 as uuid } from 'uuid'

export type Itinerary = {
  // this has to be nullable for the sake of service methods. will always verify when needed
  id?: string
  name: string
  startDate: string
  endDate: string
  createdBy: string
  editors: string[]
  viewers: string[]
}

function convertQueryResultToItinerary(row: any): Itinerary {
  return row ? {
    id: row.id,
    name: row.name,
    startDate: row.startdate,
    endDate: row.enddate,
    createdBy: row.createdby,
    editors: row.editors,
    viewers: row.viewers
  } : undefined
}

export async function insertItinerary(itinerary: Itinerary): Promise<Itinerary> {
  const res = await query(
    `insert into itineraries(id, name, startdate, enddate, 
            createdby, editors, viewers) values($1, $2, $3, $4, $5, $6, $7) returning *; `,
    [uuid(), itinerary.name, itinerary.startDate, itinerary.endDate, itinerary.createdBy,
    itinerary.editors, itinerary.viewers])

  return convertQueryResultToItinerary(res.rows[0])
}

export async function selectItinerary(id: string): Promise<Itinerary> {
  const res = await query(
    `select * from itineraries i
        where i.id = $1`, [id])
  return convertQueryResultToItinerary(res.rows[0])
}

export async function updateItinerary(itinerary: Itinerary): Promise<Itinerary> {
  const res = await query(
    `update itineraries i
        set name=$1, startdate=$2, enddate=$3, createdby=$4, editors=$5, viewers=$6
        where i.id = $7`,
    [itinerary.name, itinerary.startDate, itinerary.endDate, itinerary.createdBy,
    itinerary.editors, itinerary.viewers]
  )
  return convertQueryResultToItinerary(res.rows[0])
}