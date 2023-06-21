import React, { useState } from "react";
import { Itinerary } from "../Components";

export function Itineraries() {
    const [selectedLength, setSelectedLength] = useState<number>()

    return (<>
        <div className="flex mb-4">
            <h1 className="h1 w-full h-12">Build and Share Your Plans</h1>
        </div>
        <div className="flex mb-4 flex-col">
            <h2 className="h2 w-full h-12 basis-full">How long is your trip?</h2>
            <div className="flex mb-4 flex-row">
                <button onClick={() => setSelectedLength(1)}
                    className="btn-primary w-1/3 h-12 m-4">
                    Single Day Excursion
                </button>
                <button
                    onClick={() => setSelectedLength(3)}
                    className="btn-primary w-1/3 h-12 m-4">
                    Weekend Getaway
                </button>
                <button
                    onClick={() => setSelectedLength(10)}
                    className="btn-primary w-1/3 h-12 m-4">
                    Extended Holiday
                </button>
            </div>
            {selectedLength && <Itinerary length={selectedLength} />}
        </div>
    </>
    )
}