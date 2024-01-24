import React, { useEffect, useState } from "react";
import { Itinerary } from "../../Components";
import { DatePicker } from "../../Components/Utilities";
import dayjs from "dayjs";
import { DayDetails } from "../../Types/DayDetails";
import { ActivityCategories } from "../../Types/ActivityCategories";
import { CREATE_ACTIVITIES, CREATE_ITINERARY } from "../../Types/ApiRoutes";
import { ItineraryDetails } from "../../Types/ItineraryDetails";
import { Toast, ToastTypes } from "../../Components/Utilities/Toast";

export function NewItinerary() {
  const [startDate, setStartDate] = useState<string>(dayjs().format('YYYY-MM-DD'))
  const [endDate, setEndDate] = useState<string>(dayjs().format('YYYY-MM-DD'))
  const [tripName, setTripName] = useState<string>()
  const [dateError, setDateError] = useState<string>()
  const [itinerary, setItinerary] = useState<DayDetails[]>()
  const [toastVisible, setToastVisible] = useState<boolean>(false)
  const [toastStatus, setToastStatus] = useState<ToastTypes>()

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
    const itineraryDetails: ItineraryDetails = {
      name: tripName,
      startDate: startDate,
      endDate: endDate,
      createdBy: '0f54b1d8-07c9-4fa1-b7a9-373bb30dab8a',
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
        setToastStatus(ToastTypes.SUCCESS)
        setToastVisible(true)
        setTimeout(() => {
          setToastVisible(false)
        }, 3000)
      }
      else {
        setToastStatus(ToastTypes.ERROR)
        setToastVisible(true)
        setTimeout(() => {
          setToastVisible(false)
        }, 3000)
      }
    }
  }

  return (<>
    <div className="flex mb-4">
      <h1 className="h1 w-full h-12">Build Your Dream Vacation</h1>
    </div>
    <div className="flex mb-4 flex-col">
      <h2 className="h2 w-full h-12 basis-full p-3">Enter Trip Dates to Get Started!</h2>
      <label className="p-3">Trip Name: <input value={tripName} onChange={(e) => setTripName(e.target.value)}></input></label>
      <div className="flex mb-4 flex-row">
        <DatePicker date={startDate} setDate={(date: string) => setStartDate(date)} label={'Start Date:'} />
        <DatePicker date={endDate} setDate={(date: string) => setEndDate(date)} label={'End Date:'} />
      </div>
      {dateError && <p className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">{dateError}</p>}
      {startDate && endDate && <Itinerary days={itinerary} setDays={setItinerary} onSave={onSave} />}
      {toastVisible && <Toast
        message={toastStatus === ToastTypes.SUCCESS ? 'Itinerary created!' : 'Error creating itinerary.'}
        type={toastStatus} />}
    </div>
  </>
  )
}