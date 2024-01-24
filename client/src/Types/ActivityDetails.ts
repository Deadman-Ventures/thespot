import { ActivityCategories } from "./ActivityCategories"

export type ActivityDetails = {
  time: string
  name: string
  date: string
  category: ActivityCategories
  duration?: number
  location: string
  cost?: number
  notes?: string
  link?: string
  id?: string
  itineraryId?: string
}