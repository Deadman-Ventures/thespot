import React from "react";

interface DatePickerProps {
    date: string
    setDate: any
}
export function DatePicker(props: DatePickerProps) {
    return (
        <input type="date"
            value={props.date}
            min={props.date}
            onChange={(e) => props.setDate(e.target.value)}
            className="m-2" />
    )
}