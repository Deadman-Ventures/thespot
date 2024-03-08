import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GET_ACTIVITIES_ON_ITINERARY, GET_ITINERARY, GET_USER_ITINERARIES, UPDATE_ITINERARY_ACTIVITIES } from "../../Types/ApiRoutes";
import Session from 'supertokens-auth-react/recipe/session';
import { ItineraryDetails } from "../../Types/ItineraryDetails";
import { DayDetails } from "../../Types/DayDetails";
import { Itinerary } from "../../Components";

export function ExistingItinerary() {
  const navigate = useNavigate()
  const { id: itineraryId } = useParams()
  const [itinerary, setItinerary] = useState<DayDetails[]>()
  const [itineraryDetails, setItineraryDetails] = useState<ItineraryDetails>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const mapActivitiesByDate = (activities) => {
      const days: DayDetails[] = []
      activities.forEach(a => {
        const date = a.date
        const day = days.find(d => d.date === date)
        if (day) {
          day.activities.push(a)
        } else {
          days.push({ date, activities: [a] })
        }
      })
      return days
    }

    const getItinerary = async () => {
      const itineraryResponse = await fetch(`${GET_ITINERARY}/${itineraryId}`);
      if (!itineraryResponse.ok) {
        alert('Error getting itinerary. Please try again later.')
        navigate(`/itineraries`)
      }
      const itinerary = await itineraryResponse.json();
      setItineraryDetails(itinerary)

      const activitiesResponse = await fetch(`${GET_ACTIVITIES_ON_ITINERARY}/${itineraryId}`);
      if (!itineraryResponse.ok) {
        alert('Error getting itinerary. Please try again later.')
        navigate(`/itineraries`)
      }
      const activities = await activitiesResponse.json();
      setItinerary(mapActivitiesByDate(activities));
      setLoading(false)
    }

    getItinerary()
  }, [])

  if (loading) {
    return <h1>Loading...</h1>
  }

  const updateItinerary = async () => {
    const newActivities = itinerary.map(i => i.activities).flat()
    newActivities.forEach(a => {
      a.itineraryId = itineraryId
    })

    const activityResponse = await fetch(UPDATE_ITINERARY_ACTIVITIES, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newActivities),
    })

    if (activityResponse.ok) {
      alert('Itinerary updated!')
      navigate(`/itineraries`)
    }
    else {
      alert('Error updating itinerary. Please check for input errors.')
    }
  }

  return (
    <>
      <div className="flex mb-4 flex-row gap-10">
        <h1 className="h1 h-12">{itineraryDetails?.name}</h1>
      </div>
      <Itinerary days={itinerary} setDays={setItinerary} onSave={() => { updateItinerary() }} />
    </>
  )
}