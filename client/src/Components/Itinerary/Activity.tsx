import React, { useState } from "react";
import { TimePicker } from "../Utilities";
import { ActivityCategories } from "../../Types/ActivityCategories";
import { ActivityDetails } from "../../Types/ActivityDetails";

export interface ActivtyProps {
  details: ActivityDetails
  updateDetails: any
}

export function Activity(props: ActivtyProps) {

  return (<>
    <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-4">
          <div className="xl:container flex mt-10 flex-row ">
            <TimePicker time={props.details.time}
              setTime={(time: string) => { props.updateDetails({ ...props.details, time: time }) }}
              label="Time:" />
            <label
              className="block text-sm font-medium leading-6 text-gray-900 px-5">
              Name
              <textarea
                rows={1}
                className="m-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={props.details.name}
                onChange={(e) => props.updateDetails({ ...props.details, name: e.target.value })}
              />
            </label>
            <label
              className="block text-sm font-medium leading-6 text-gray-900 px-5">
              Category
              <select value={props.details.category}
                className="md m-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => props.updateDetails({ ...props.details, category: e.target.value })}>
                {Object.values(ActivityCategories).map(a => (
                  <option value={a}>{a}</option>
                ))}
              </select>
            </label>
            <label
              className="block text-sm font-medium leading-6 text-gray-900 px-5">
              Duration (h)
              <input
                type='number'
                step={0.5}
                className="m-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={props.details.duration}
                onChange={(e) => props.updateDetails({ ...props.details, duration: e.target.value })}
              />
            </label>
            <label
              className="block text-sm font-medium leading-6 text-gray-900 px-5">
              Location
              <textarea
                rows={1}
                className="m-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={props.details.location}
                onChange={(e) => props.updateDetails({ ...props.details, location: e.target.value })}
              />
            </label>
            <label
              className="block text-sm font-medium leading-6 text-gray-900 px-5">
              Cost
              <input
                type='number'
                step={0.01}
                className="m-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={props.details.cost}
                onChange={(e) => props.updateDetails({ ...props.details, cost: e.target.value })}
              />
            </label>
            <label
              className="block text-sm font-medium leading-6 text-gray-900 px-5">
              Notes
              <textarea
                rows={2}
                className="m-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={props.details.notes}
                onChange={(e) => props.updateDetails({ ...props.details, notes: e.target.value })}
              />
            </label>
            <label
              className="block text-sm font-medium leading-6 text-gray-900 px-5">
              Link
              <textarea
                rows={1}
                className="m-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={props.details.link}
                onChange={(e) => props.updateDetails({ ...props.details, link: e.target.value })}
              />
            </label>
          </div>
        </div>
      </div>
    </form>
  </>)
}