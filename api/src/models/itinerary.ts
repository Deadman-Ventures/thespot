import { query } from "../db"

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

export async function insertItinerary(itinerary: Itinerary): Promise<Itinerary> {
    const res = await query(
        `insert into itineraries(name, startDate, endDate, 
            createdBy, editors, viewers) values($1, $2, $3, $4, $5, $6); `,
        [itinerary.name, itinerary.startDate, itinerary.endDate, itinerary.createdBy,
        itinerary.editors, itinerary.viewers])

    return res.rows[0] as unknown as Itinerary
}

export async function selectItinerary(id: string): Promise<Itinerary> {
    const res = await query(
        `select * from itineraries i
        where i.id = $1`, [id])
    return res.rows[0] as unknown as Itinerary
}

export async function updateItinerary(itinerary: Itinerary): Promise<Itinerary> {
    const res = await query(
        `update itineraries i
        set name=$1, startDate=$2, endDate=$3, createdBy=$4, editors=$5, viewers=$6
        where i.id = $7`,
        [itinerary.name, itinerary.startDate, itinerary.endDate, itinerary.createdBy,
        itinerary.editors, itinerary.viewers]
    )
    return res.rows[0] as unknown as Itinerary ?? undefined
}