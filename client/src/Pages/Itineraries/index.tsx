import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GET_USER_ITINERARIES } from "../../Types/ApiRoutes";
import Session from 'supertokens-auth-react/recipe/session';
import { ItineraryDetails } from "../../Types/ItineraryDetails";

export function Itineraries() {
  const navigate = useNavigate()
  const [userItineraries, setUserItineraries] = useState<ItineraryDetails[]>()

  useEffect(() => {
    const getUserItineraries = async () => {
      const userId = await Session.getUserId();
      const itineraryResponse = await fetch(`${GET_USER_ITINERARIES}/${userId}`);
      const itineraries = await itineraryResponse.json();
      setUserItineraries(itineraries);
    }

    getUserItineraries()
  }, [])

  return (
    <>
      <div className="flex mb-4 flex-col">
        <h1 className="h1 h-12">View Your Saved Trips</h1>
        <button
          className="btn-primary w-48 h-12"
          onClick={() => navigate('/itineraries/new')}>
          Build A New Trip
        </button>
      </div>
      <div className="flex mb-4 flex-col">
        {userItineraries?.map((i, index) => (
          <div key={index} className="flex mb-4 flex-col">
            <h2 className="h2 h-12">{i.name}</h2>
            <button
              className="btn-primary w-48 h-12"
              onClick={() => navigate(`/itineraries/${i.id}`)}>
              View Trip
            </button>
          </div>
        )) ?? <h2 className="h2 h-12">No trips yet, create one now!</h2>}
      </div>
    </>
  )
}