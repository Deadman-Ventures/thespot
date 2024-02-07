import React, { useState } from "react";
import { TimePicker } from "../Utilities";
import { ActivityCategories } from "../../Types/ActivityCategories";
import { ActivityDetails } from "../../Types/ActivityDetails";
import { MinusCircleIcon } from "@heroicons/react/24/outline";


export interface ActivtyProps {
  details: ActivityDetails
  updateDetails: any
  removeActivity: any
}

export function Activity(props: ActivtyProps) {

  return (<>
    <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-4">
          <div className="container flex-wrap mt-10 flex-column md:flex md:flex-row md:gap-3">
            <TimePicker time={props.details.time}
              setTime={(time: string) => { props.updateDetails({ ...props.details, time: time }) }}
              label="Time:" />
            <label
              className="text-sm font-medium text-gray-900">
              Name
              <textarea
                rows={1}
                className="m-2 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                value={props.details.name}
                onChange={(e) => props.updateDetails({ ...props.details, name: e.target.value })}
              />
            </label>
            <label
              className="block text-sm font-medium text-gray-900">
              Category
              <select value={props.details.category}
                className="m-2 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm "
                onChange={(e) => props.updateDetails({ ...props.details, category: e.target.value })}>
                {Object.values(ActivityCategories).map(a => (
                  <option value={a} key={a}>{a}</option>
                ))}
              </select>
            </label>
            <label
              className="block text-sm font-medium text-gray-900">
              Duration (h)
              <input
                type='number'
                step={0.5}
                className="m-2 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                value={props.details.duration}
                onChange={(e) => props.updateDetails({ ...props.details, duration: e.target.value })}
              />
            </label>
            <label
              className="block text-sm font-medium text-gray-900">
              Location
              <textarea
                rows={1}
                className="m-2 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                value={props.details.location}
                onChange={(e) => props.updateDetails({ ...props.details, location: e.target.value })}
              />
            </label>
            <label
              className="block text-sm font-medium text-gray-900">
              Cost
              <input
                type='number'
                step={0.01}
                className="m-2 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                value={props.details.cost}
                onChange={(e) => props.updateDetails({ ...props.details, cost: e.target.value })}
              />
            </label>
            <label
              className="block text-sm font-medium text-gray-900">
              Notes
              <textarea
                rows={2}
                className="m-2 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                value={props.details.notes}
                onChange={(e) => props.updateDetails({ ...props.details, notes: e.target.value })}
              />
            </label>
            <label
              className="block text-sm font-medium text-gray-900">
              Link
              <textarea
                rows={1}
                className="m-2 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                value={props.details.link}
                onChange={(e) => props.updateDetails({ ...props.details, link: e.target.value })}
              />
            </label>
          </div>
          <MinusCircleIcon className="h-5 w-5 text-gray-400" aria-hidden="true" onClick={() => props.removeActivity()} />
        </div>
      </div>
    </form>
  </>)
}