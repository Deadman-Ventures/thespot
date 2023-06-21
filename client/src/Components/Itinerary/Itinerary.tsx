import React, { useEffect, useState } from "react";
import { Day } from "./Day";

interface ItineraryProps {
    length: number
}

type DayAttributes = {
    day: number
    details: string
}

export function Itinerary(props: ItineraryProps) {
    const [tripDays, setTripDays] = useState<DayAttributes[]>()

    useEffect(() => {
        const days: DayAttributes[] = []
        for (let i = 0; i < props.length; i++) {
            days.push({ day: i + 1, details: '' })
        }
        setTripDays([...days])
    }, [props.length])

    const removeDay = () => {
        tripDays.pop()
        setTripDays([...tripDays])
    }

    const addDay = () => {
        tripDays.push({ day: tripDays.length + 1, details: '' })
        setTripDays([...tripDays])
    }

    return (<>
        {tripDays?.map((d, i) => (
            <Day
                day={d.day}
                details={d.details}
                onDetailsChange={e => {
                    tripDays[i].details = e.target.defaultValue
                    setTripDays([...tripDays])
                }} />
        ))}
        <button
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
        </button>

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