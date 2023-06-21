import React, { useState } from "react";

interface DayProps {
    day: number
}

export function Day(props: DayProps) {
    const [hourly, setHourly] = useState(false)

    return (<>
        <form>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="h2">Day {props.day}</h2>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="col-span-full">
                            <label htmlFor="tripDetails"
                                className="block text-sm font-medium leading-6 text-gray-900">
                                Trip Details
                            </label>
                            <p className="mt-3 text-sm leading-6 text-gray-600">Outline your day's activities here.</p>
                            <div className="mt-2">
                                <textarea
                                    id="tripDetails"
                                    rows={3}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={''}
                                />
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </form>
    </>)
}