import React, { useState } from "react";
import { DatePicker, Dropdown, TimePicker } from "../Utilities";
import dayjs from 'dayjs';
import { Activity } from "./Activity";
import { ActivityDetails } from "../../Types/ActivityDetails";
import { DayDetails } from "../../Types/DayDetails";
import { ActivityCategories } from "../../Types/ActivityCategories";

export interface DayProps {
  details: DayDetails
  updateDetails: any
}

export function Day(props: DayProps) {
  const updateActivityDetails = (activty: number, newActivityDetails: ActivityDetails) => {
    props.details.activities[activty] = { ...newActivityDetails }
    props.updateDetails({ ...props.details })
  }

  const addActivity = () => {
    props.details.activities.push({
      category: ActivityCategories.lodging,
      time: '9:00AM',
      location: 'Location',
      name: 'New Activity'
    })
    props.updateDetails({ ...props.details, activities: [...props.details.activities] })
  }

  return (<>
    <div className="space-y-12">
      <div className="border-b border-gray-900/10 pb-4">
        <h2 className="h2">
          Date: {props.details.date}
        </h2>
        {props.details.activities.map((a, i) => (
          <Activity details={a} updateDetails={(newDetails: ActivityDetails) => updateActivityDetails(i, { ...newDetails })} />
        ))}
        <button
          className="btn-primary mt-2"
          onClick={() => addActivity()}
        >
          + Add Activity
        </button>
      </div>
    </div>
  </>)
}