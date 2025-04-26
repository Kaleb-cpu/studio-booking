"use client";

import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar.css"; // your custom styling

type BusyRange = { start: string; end: string };

export default function BookingCalendar({
  onSelectDate,
  selectedDate,
}: {
  onSelectDate: (date: Date) => void;
  selectedDate: Date | null;
}) {
  const [busyRanges, setBusyRanges] = useState<BusyRange[]>([]);

  useEffect(() => {
    fetch("/api/calendar/busy")
      .then((res) => res.json())
      .then((data) => {
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

    return (
      !busyRanges.some((range) => {
        const start = new Date(range.start);
        const end = new Date(range.end);
        return date >= start && date < end;
      }) && isWithinHours
    );
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const dateOnly = new Date(date);
      dateOnly.setHours(12); // timezone safe

      const isPast = dateOnly < new Date();
      const unavailable = busyRanges.some((range) => {
        const start = new Date(range.start);
        return start.toDateString() === dateOnly.toDateString();
      });

      if (selectedDate && dateOnly.toDateString() === selectedDate.toDateString()) {
        return "tile-selected"; // highlight selected date
      }

      if (isPast || unavailable) return "tile-unavailable";
      return "tile-available";
    }
  };

  const handleDateChange = (value: Date | Date[]) => {
    if (Array.isArray(value)) {
      // Handle array of dates if multi-date selection is allowed
      console.warn("Multi-date selection is not supported. Defaulting to the first date.");
      onSelectDate(value[0]);
    } else {
      // Handle single date
      onSelectDate(value);
    }
  };

  return (
    <div>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate || new Date()} // fallback if null
        tileClassName={tileClassName}
      />
    </div>
  );
}
