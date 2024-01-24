import React from "react";

interface DatePickerProps {
  date: string
  setDate: any
  label: string
}
export function DatePicker(props: DatePickerProps) {
  return (
    <label
      className="block text-sm font-medium leading-6 text-gray-900">{props.label}
      <input type="date"
        value={props.date}
        min={props.date}
        onChange={(e) => props.setDate(e.target.value)}
        className="m-2" />
    </label>
  )
}