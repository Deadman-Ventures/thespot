import { pool } from "../db"

export type Itinerary = {
    // this has to be nullable for the sake of service methods. will always verify when needed
    id?: string
    name: string
    startDate: Date
    endDate: Date
    createdBy: string
    editors: string[]
    viewers: string[]
}

export function insertItinerary(itinerary: Itinerary): Itinerary {
    // const res = await pool.query(
    //     `insert into itineraries(name, startDate, endDate, 
    //         createdBy, editors, viewers) values($1, $2, $3, $4, $5, $6); `,
    //     [itinerary.name, itinerary.startDate, itinerary.endDate, itinerary.createdBy,
    //     itinerary.editors, itinerary.viewers])

    return
}

export function selectItinerary(id: string): Itinerary {
    return
}

export function updateItinerary(itinerary: Itinerary): Itinerary {
    return
}

export function itineraryExists(id: string): boolean {
    return
}