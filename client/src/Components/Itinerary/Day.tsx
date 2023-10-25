import React, { useState } from "react";
import { DatePicker, Dropdown, TimePicker } from "../Utilities";
import dayjs from 'dayjs';

export interface DayProps {
    day: number
    details: string
    onDetailsChange: any
}

export function Day(props: DayProps) {
    const [hourly, setHourly] = useState(false)
    const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'))
    const [time, setTime] = useState('9:00')

    return (<>
        <form>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-4">
                    <h2 className="h2">Date:
                        <DatePicker date={date} setDate={setDate} />
                    </h2>
                    <div className="mt-10 flex-row">
                        <TimePicker time={time} setTime={setTime} />
                        <Dropdown options={['test', '2']} />
                        <div className="">
                            <label
                                className="block text-sm font-medium leading-6 text-gray-900">
                                Activity
                            </label>
                            <div className="mt-2">
                                <textarea
                                    rows={3}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={''}
                                    onChange={props.onDetailsChange}
                                />
                            </div>
                            <label
                                className="block text-sm font-medium leading-6 text-gray-900">
                                Notes
                            </label>
                            <div className="mt-2">
                                <textarea
                                    rows={3}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={''}
                                    onChange={props.onDetailsChange}
                                />
                            </div>
                        </div>


                    </div>
                </div>


            </div>
        </form>
    </>)
}