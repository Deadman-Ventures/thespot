import React, { useEffect, useState } from "react";
import { Day } from "./Day";
import { ActivityCategories } from "../../Types/ActivityCategories";
import dayjs from "dayjs";
import { DayDetails } from "../../Types/DayDetails";

interface ItineraryProps {
  dates: string[]
}

export function Itinerary(props: ItineraryProps) {
  const [tripDays, setTripDays] = useState<DayDetails[]>()

  useEffect(() => {
    const days: DayDetails[] = []
    props.dates.forEach(d => {
      days.push({
        date: d,
        activities: [
          {
            category: ActivityCategories.lodging,
            location: 'Location',
            name: 'New Activity',
            time: '9:00AM'
          }
        ]
      })
    })
    setTripDays([...days])
  }, [props.dates])

  const removeDay = () => {
    tripDays.pop()
    setTripDays([...tripDays])
  }

  const addDay = () => {
    tripDays.push({ date: dayjs().format('YYYY-MM-DD'), activities: [] })
    setTripDays([...tripDays])
  }

  const updateDay = (day: number, newDayDetails: DayDetails) => {
    tripDays[day] = { ...newDayDetails }
    setTripDays([...tripDays])
  }

  return (<>
    {tripDays?.map((d, i) => (
      <Day
        details={d}
        updateDetails={(newDetails: DayDetails) => updateDay(i, newDetails)}
      />
    ))}
    {/* <button
      className="btn-primary bg-red-600"
      onClick={() => removeDay()}
      disabled={tripDays?.length === 0}
    >
      - Remove Day
    </button>
    <button
      className="btn-primary mt-2"
      onClick={() => addDay()}
    >
      + Add Day
    </button> */}

    <div className="mt-6 flex items-center justify-end gap-x-6">

      <button type="button" className="btn-cancel">
        Cancel
      </button>
      <button
        type="submit"
        className="btn-primary"
      >
        Save
      </button>
    </div>
  </>)
}