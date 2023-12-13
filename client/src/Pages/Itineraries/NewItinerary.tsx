import React, { useEffect, useState } from "react";
import { Itinerary } from "../../Components";
import { DatePicker } from "../../Components/Utilities";
import dayjs from "dayjs";

export function NewItinerary() {
  const [startDate, setStartDate] = useState<string>(dayjs().format('YYYY-MM-DD'))
  const [endDate, setEndDate] = useState<string>(dayjs().format('YYYY-MM-DD'))
  const [dateError, setDateError] = useState<string>()

  useEffect(() => {
    const _startDate = new Date(startDate);
    const _endDate = new Date(endDate);
    if (_endDate < _startDate) {
      setDateError('End date must be after start date.')
    }
    else {
      setDateError(undefined)
    }
  }, [startDate, endDate])

  const getTripDates = () => {
    const dateList: string[] = [];
    const _startDate = new Date(startDate);
    const _endDate = new Date(endDate);

    // Make sure the start date is before or equal to the end date
    // if (_startDate > _endDate) {
    //   throw new Error('Start date must be before or equal to end date');
    // }

    // Loop through the dates and add them to the list
    let currentDate = _startDate;
    while (currentDate <= _endDate) {
      const formattedDate = currentDate.toISOString().split('T')[0];
      dateList.push(formattedDate);

      // Move to the next day
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateList;
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
      {/* <div className="flex mb-4 flex-row">
        <button onClick={() => setSelectedTripLength(1)}
          className="btn-primary w-1/3 h-12 m-4">
          Single Day Excursion
        </button>
        <button
          onClick={() => setSelectedTripLength(3)}
          className="btn-primary w-1/3 h-12 m-4">
          Weekend Getaway
        </button>
        <button
          onClick={() => setSelectedTripLength(10)}
          className="btn-primary w-1/3 h-12 m-4">
          Extended Holiday
        </button>
      </div> */}
      {startDate && endDate && <Itinerary dates={getTripDates()} />}
    </div>
  </>
  )
}