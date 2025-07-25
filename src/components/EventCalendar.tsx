"use client"

import Image from "next/image";
import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';


type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const events = [
{
  id: 1,
  title: "Lorem ipsum dolor",
  time: "12:00 PM - 02:00 PM",
  description: "Lorem Ipsum dolor silt assent. Consecutor adicpting eli",
},
{
  id: 2,
  title: "Lorem ipsum dolor",
  time: "12:00 PM - 02:00 PM",
  description: "Lorem Ipsum dolor silt assent. Consecutor adicpting eli",
},
{
  id: 3,
  title: "Lorem ipsum dolor",
  time: "12:00 PM - 02:00 PM",
  description: "Lorem Ipsum dolor silt assent. Consecutor adicpting eli",
},
{
  id: 4,
  title: "Lorem ipsum dolor",
  time: "12:00 PM - 02:00 PM",
  description: "Lorem Ipsum dolor silt assent. Consecutor adicpting eli",
}
]



const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());

    return (
    <div className="bg-white p-4 rounded-md">
        <Calendar onChange={onChange} value={value} />
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold my-4">Events</h1>
            <Image src="/moreDark.png" alt="More" width={20} height={20} className="cursor-pointer"/>
          </div>
        <div className="flex flex-col gap-4">
          {events.map(event=>(
            <div className="p-5 rounded-md border-2 border-t-4 border-gray-100 odd:border-t-lamaSky even:border-t-lamaPurple" key={event.id}>
              <div className="flex items-center justify-between">
                <h1 className="font-semibold text-gray-600">{event.title}</h1>
                <span className="text-xs text-gray-300">{event.time}</span>
              </div>
              <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
            </div>
          ))}
        </div>
    </div>
  )
}

export default EventCalendar