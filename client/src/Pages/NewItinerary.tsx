import React, { useState } from "react";
import { Itinerary } from "../Components";

export function NewItinerary() {
    const [selectedTripLength, setSelectedTripLength] = useState<number>()

    return (<>
        <div className="flex mb-4">
            <h1 className="h1 w-full h-12">Build Your Dream Vacation</h1>
        </div>
        <div className="flex mb-4 flex-col">
            <h2 className="h2 w-full h-12 basis-full">How long is your trip?</h2>
            <div className="flex mb-4 flex-row">
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
            </div>
            {selectedTripLength && <Itinerary length={selectedTripLength} />}
        </div>
    </>
    )
}