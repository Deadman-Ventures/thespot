import React from "react";

interface TimePickerProps {
    time: string
    setTime: any
}
export function TimePicker(props: TimePickerProps) {
    return (
        <input type="time"
            value={props.time}
            min={props.time}
            onChange={(e) => props.setTime(e.target.value)}
            className="m-2" />
    )
}