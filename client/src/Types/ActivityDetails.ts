import { ActivityCategories } from "./ActivityCategories"

export type ActivityDetails = {
  time: string
  name: string
  category: ActivityCategories
  duration?: number
  location: string
  cost?: number
  notes?: string
  link?: string
}