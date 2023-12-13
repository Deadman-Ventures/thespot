import React from "react";

interface TimePickerProps {
  time: string
  setTime: any
  label: string
}
export function TimePicker(props: TimePickerProps) {
  return (
    <label
      className="block text-sm font-medium leading-6 text-gray-900">{props.label}
      <input type="time"
        value={props.time}
        min={props.time}
        onChange={(e) => props.setTime(e.target.value)}
        className="m-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
    </label>
  )
}