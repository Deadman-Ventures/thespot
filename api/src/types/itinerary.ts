import { Activities } from "./activities"

export type Itinerary = {
    id?: string
    location: string
    tripLength: number
    description: string
    activities: Activities[]
    guideId: string
}