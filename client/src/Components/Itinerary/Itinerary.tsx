import React, { useEffect, useState } from "react";
import { Day } from "./Day";
import { ActivityCategories } from "../../Types/ActivityCategories";
import dayjs from "dayjs";
import { DayDetails } from "../../Types/DayDetails";

interface ItineraryProps {
  days: DayDetails[]
  setDays: any
  onSave: any
}

export function Itinerary(props: ItineraryProps) {
  const [error, setError] = useState<string>()



  const validateItinerary = () => {
    props.days.forEach(d => {
      if (!d.date) {
        return 'Each day in the trip must have a date.'
      }
      d.activities.forEach(a => {
        if (!a.category || !a.location || !a.name || !a.time) {
          return 'Each activity must have a category, name, location, and time.'
        }
      })
    })
  }

  const updateDay = (day: number, newDayDetails: DayDetails) => {
    props.days[day] = { ...newDayDetails }
    props.setDays([...props.days])
  }

  const onSave = () => {
    validateItinerary()
    props.onSave()
  }

  return (<>
    {props.days?.map((d, i) => (
      <Day
        details={d}
        updateDetails={(newDetails: DayDetails) => updateDay(i, newDetails)}
      />
    ))}
    <div className="mt-6 flex items-center justify-end gap-x-6">
      <button type="button" className="btn-cancel">
        Cancel
      </button>
      <button
        type="submit"
        className="btn-primary"
        onClick={() => onSave()}
      >
        Save
      </button>
    </div>
  </>)
}