import React, { useEffect, useRef, useState } from "react";

import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";
import { DayPicker } from "react-day-picker";

import "react-day-picker/dist/style.css";
import { calendar } from "../../assets/icons/icons";

type DateProps = {
  selectedDate: Date | string | undefined;
  disable?: (day: Date) => boolean;
  label?: string;
  className?: string;
  onChange: (date: Date | undefined) => void;
};

const DatePicker = ({ selectedDate, onChange, disable, label, className }: DateProps) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const [isCalendarOpen, setCalendarOpen] = useState(false);

  const formatDate = (date: Date | string) => {
    const formattedDate = dayjs(date).format("DD/MM/YYYY");
    const isToday = formattedDate === dayjs().format("DD/MM/YYYY");
    return isToday ? `Today, ${formattedDate}` : formattedDate;
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

  const toggleCalendar = () => setCalendarOpen((prevState) => !prevState);

  const handleInputClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCalendarOpen(true);
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
            disabled
            onClick={handleInputClick}
          />
          <div className="justify-self-end cursor-pointer" onClick={toggleCalendar}>
            {calendar}
          </div>
        </div>
      </div>
      {isCalendarOpen && (
        <div ref={selectRef}>
          <DayPicker
            className="w-[290px] text-white p-2 relative caret-red-500 z-10 -top-2 -left-5 overflow-y-auto h-auto bg-black bg-opacity-90 rounded-xl"
            mode="single"
            selected={selectedDate as Date}
            onSelect={setDate}
            disabled={disable}
            showOutsideDays
            fixedWeeks
            modifiersClassNames={{
              selected: "date-selected",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DatePicker;
