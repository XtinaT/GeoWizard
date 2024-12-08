import React, { useEffect, useRef, useState } from "react";

import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";
import { DayPicker } from "react-day-picker";

import "react-day-picker/dist/style.css";
import { calendar } from "../assets/icons/icons";

type DateProps = {
  selectedDate: Date | string | undefined;
  disable?: (day: Date) => boolean;
  label?: string;
  className?: string;
  onChange?: (date: Date | undefined) => void;
};

const css = `
  .my-selected:not([disabled]) { 
    font-weight: bold; 
    background-color: #48CDAF;
  }
  .my-selected:hover:not([disabled]) { 
    border-color: blue;
    color: blue;
  }
  .my-today { 
    font-weight: bold;
    font-size: 140%; 
    color: red;
  }
`;

const DatePicker = ({
  selectedDate,
  onChange,
  // setSelectedDate,
  disable,
  label,
  className,
}: DateProps) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const [isCalendarOpen, setCalendarOpen] = useState(false);

  const formatDate = (date: Date | string) => {
    const isToday = dayjs(date).format("DD/MM/YYYY") === dayjs(new Date()).format("DD/MM/YYYY");
    const chosenDay = dayjs(date).format("DD/MM/YYYY");
    const today = dayjs(new Date()).format("DD/MM/YYYY");
    return isToday ? `Today, ${today}` : chosenDay;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node) &&
        (event.target as HTMLElement).id !== "calendar"
      ) {
        setCalendarOpen(false);
      }
    };
    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const setDate = (date: Date | undefined) => {
    onChange && onChange(date);
    setCalendarOpen(false);
  };

  return (
    <div className={`flex flex-col gap-1 relative sm:w-[284px] w-[80vw] ${className}`}>
      <div className="flex flex-col gap-3">
        <label>{label}</label>
        <div className="flex items-center text-white bg-black bg-opacity-40 rounded-full px-4 py-[14px]">
          <input
            type="text"
            placeholder="DD/MM/YYYY"
            className="grow date-input bg-transparent border-none focus:border-none focus:outline-none"
            value={selectedDate ? formatDate(selectedDate) : ""}
            onChange={(e) => {
              const inputDate = e.target.value;
              const parsedDate = new Date(inputDate);
              onChange && onChange(parsedDate);
            }}
            autoFocus
            disabled
            onClick={() => setCalendarOpen(true)}
          />
          <div className="justify-self-end cursor-pointer" onClick={() => setCalendarOpen((prevState) => !prevState)}>
            {calendar}
          </div>
        </div>
      </div>
      {isCalendarOpen && (
        <div ref={selectRef}>
          <style>{css}</style>
          <DayPicker
            className="w-[290px] text-white p-2 relative caret-red-500 z-10 -top-2 -left-5 overflow-y-auto h-auto bg-black bg-opacity-90 rounded-xl"
            mode="single"
            selected={selectedDate as Date}
            onSelect={setDate}
            disabled={disable}
            showOutsideDays
            fixedWeeks
            modifiersClassNames={{
              selected: "my-selected",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DatePicker;
