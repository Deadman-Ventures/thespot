import React, { useEffect, useState } from "react";
import { Itinerary } from "../../Components";
import { DatePicker } from "../../Components/Utilities";
import dayjs from "dayjs";
import { DayDetails } from "../../Types/DayDetails";
import { ActivityCategories } from "../../Types/ActivityCategories";

export function NewItinerary() {
  const [startDate, setStartDate] = useState<string>(dayjs().format('YYYY-MM-DD'))
  const [endDate, setEndDate] = useState<string>(dayjs().format('YYYY-MM-DD'))
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
              time: '09:00'
            }
          ]
        })
      })
      setItinerary([...days])
    }
  }, [startDate, endDate])

  const getTripDates = (start: Date, end: Date) => {
    const dateList: string[] = [];

    // Make sure the start date is before or equal to the end date
    // if (_startDate > _endDate) {
    //   throw new Error('Start date must be before or equal to end date');
    // }

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
    const response = await fetch("https://example.com/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itinerary),
    });
  }

  return (<>
    <div className="flex mb-4">
      <h1 className="h1 w-full h-12">Build Your Dream Vacation</h1>
    </div>
    <div className="flex mb-4 flex-col">
      <h2 className="h2 w-full h-12 basis-full">Enter Trip Dates to Get Started!</h2>
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