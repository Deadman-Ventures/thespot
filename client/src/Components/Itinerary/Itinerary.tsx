import React, { useEffect, useState } from "react";
import { Day } from "./Day";

interface ItineraryProps {
    length: number
}

export function Itinerary(props: ItineraryProps) {
    const [tripDays, setTripDays] = useState<any[]>()

    useEffect(() => {
        const days = []
        for (let i = 0; i < props.length; i++) {
            days.push(<Day day={i + 1} key={i} />)
        }
        setTripDays([...days])
    }, [props.length])

    const removeDay = () => {
        tripDays.pop()
        setTripDays([...tripDays])
    }

    const addDay = () => {
        tripDays.push(<Day day={tripDays.length + 1} key={tripDays.length} />)
        setTripDays([...tripDays])
    }

    return (<>
        {tripDays}
        <button
            className="btn-primary bg-red-600"
            onClick={() => removeDay()}
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