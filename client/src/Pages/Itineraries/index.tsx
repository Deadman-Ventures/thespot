import React from "react";
import { useNavigate } from "react-router-dom";

export function Itineraries() {
    const navigate = useNavigate()
    return (
        <>
            <div className="flex mb-4 flex-col">
                <h1 className="h1 h-12">View Your Saved Trips</h1>
                <button
                    className="btn-primary w-1/4"
                    onClick={() => navigate('/itineraries/new')}>
                    Build A New Trip
                </button>
            </div>
            <div className="flex mb-4 flex-col">

            </div>
        </>
    )
}