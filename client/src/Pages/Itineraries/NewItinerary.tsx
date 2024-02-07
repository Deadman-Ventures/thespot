import React, { useEffect, useState } from "react";
import { Itinerary } from "../../Components";
import { DatePicker } from "../../Components/Utilities";
import dayjs from "dayjs";
import { DayDetails } from "../../Types/DayDetails";
import { ActivityCategories } from "../../Types/ActivityCategories";
import { CREATE_ACTIVITIES, CREATE_ITINERARY } from "../../Types/ApiRoutes";
import { ItineraryDetails } from "../../Types/ItineraryDetails";
import Session from 'supertokens-auth-react/recipe/session';
import { useNavigate } from "react-router";

export function NewItinerary() {
  const navigate = useNavigate()
  const [startDate, setStartDate] = useState<string>(dayjs().format('YYYY-MM-DD'))
  const [endDate, setEndDate] = useState<string>(dayjs().format('YYYY-MM-DD'))
  const [tripName, setTripName] = useState<string>()
  const [dateError, setDateError] = useState<string>()
  const [itinerary, setItinerary] = useState<DayDetails[]>()

  useEffect(() => {
    const _startDate = new Date(startDate);
    const _endDate = new Date(endDate);
    if (_endDate < _startDate) {
      setDateError('End date must be after start date.')
    }
    else {
      setDateError(undefined)
      const days: DayDetails[] = []
      const dates = getTripDates(_startDate, _endDate)
      dates.forEach(d => {
        days.push({
          date: d,
          activities: [
            {
              category: ActivityCategories.lodging,
              location: 'Location',
              name: 'New Activity',
              time: '09:00',
              date: d
            }
          ]
        })
      })
      setItinerary([...days])
    }
  }, [startDate, endDate])

  const getTripDates = (start: Date, end: Date) => {
    const dateList: string[] = [];

    // Loop through the dates and add them to the list
    let currentDate = start;
    while (currentDate <= end) {
      const formattedDate = currentDate.toISOString().split('T')[0];
      dateList.push(formattedDate);

      // Move to the next day
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateList;
  }

  const onSave = async () => {
    let userId = await Session.getUserId();

    const itineraryDetails: ItineraryDetails = {
      name: tripName,
      startDate: startDate,
      endDate: endDate,
      createdBy: userId,
      editors: [],
      viewers: []
    }
    const itineraryResponse = await fetch(CREATE_ITINERARY, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itineraryDetails),
    });
    const newItinerary = await itineraryResponse.json()
    console.log(newItinerary)

    if (itineraryResponse.ok) {
      const newActivities = itinerary.map(i => i.activities).flat()
      newActivities.forEach(a => {
        a.itineraryId = newItinerary.id
      })
      console.log(newActivities)
      const activityResponse = await fetch(CREATE_ACTIVITIES, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newActivities),
      })

      if (activityResponse.ok) {
        alert('Itinerary created!')
        navigate(`/itineraries`)
      }
      else {
        alert('Error creating itinerary. Please check for input errors.')
      }
    }
  }

  return (<>
    <div className="flex mb-4">
      <h1 className="h1 w-full h-12 p-2">Build Your Dream Vacation</h1>
    </div>
    <div className="flex mb-4 flex-col p-3 gap-3">
      <h2 className="h2 w-full h-12 basis-full">Enter Trip Details to Get Started!</h2>
      <label className="">Trip Name: <input value={tripName} onChange={(e) => setTripName(e.target.value)}></input></label>
      <div className="flex mb-4 flex-row">
        <DatePicker date={startDate} setDate={(date: string) => setStartDate(date)} label={'Start Date:'} />
        <DatePicker date={endDate} setDate={(date: string) => setEndDate(date)} label={'End Date:'} />
      </div>
      {dateError && <p className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">{dateError}</p>}
      {startDate && endDate && <Itinerary days={itinerary} setDays={setItinerary} onSave={onSave} />}
    </div>
  </>
  )
}