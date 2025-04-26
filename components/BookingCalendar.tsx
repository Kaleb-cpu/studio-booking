"use client";

import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar.css"; // for custom colors

type BusyRange = { start: string; end: string };

export default function BookingCalendar({
  onSelectDate,
}: {
  onSelectDate: (date: Date) => void;
}) {
  const [busyRanges, setBusyRanges] = useState<BusyRange[]>([]);
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    fetch("/api/calendar/busy")
      .then((res) => res.json())
      .then((data) => {
        // Check if data has the busyRanges array
        if (data?.busy) {
          setBusyRanges(data.busy);
        }
      })
      .catch((error) => {
        console.error("Error fetching busy ranges:", error);
      });
  }, []);

  const isDateAvailable = (date: Date) => {
    const startHour = date.getHours();
    const isWithinHours = startHour >= 8 && startHour <= 21;

    // Check if busyRanges is defined and not empty before performing checks
    return !busyRanges.some((range) => {
      const start = new Date(range.start);
      const end = new Date(range.end);
      return date >= start && date < end;
    }) && isWithinHours;
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const dateOnly = new Date(date);
      dateOnly.setHours(12); // Avoid timezone issues

      const isPast = dateOnly < new Date();
      const unavailable = busyRanges.some((range) => {
        const start = new Date(range.start);
        return start.toDateString() === dateOnly.toDateString();
      });

      if (isPast || unavailable) return "tile-unavailable";
      return "tile-available";
    }
  };

  const handleDateChange = (value: Date) => {
    setDate(value);
    onSelectDate(value);
  };

  return (
    <div>
      <Calendar
        onChange={handleDateChange}
        value={date}
        tileClassName={tileClassName}
      />
    </div>
  );
}
