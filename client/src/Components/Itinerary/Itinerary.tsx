import React, { useEffect, useState } from "react";
import { Day } from "./Day";

interface ItineraryProps {
    length: number
}

export function Itinerary(props: ItineraryProps) {
    const [tripDays, setTripDays] = useState<number>()

    useEffect(() => {
        setTripDays(props.length)
    }, [props.length])

    const componentData = Array.from({ length: tripDays }, (_, index) => ({
        id: index + 1,
        day: index + 1,
    }));

    return (<>
        {componentData.map((c) => (
            <Day day={c.day} key={c.id} />
        ))}
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