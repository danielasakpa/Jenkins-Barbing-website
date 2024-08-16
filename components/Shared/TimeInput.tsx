import React from "react";

interface TimePickerProps {
  time: string;
  setTime: (time: string) => void;
  bookedTimes: string[];
}

const generateTimeOptions = (start: string, end: string, interval: number) => {
  const options: string[] = [];
  const toMinutes = (t: string) => {
    const [hours, minutes] = t.split(":").map(Number);
    return hours * 60 + minutes;
  };
  const fromMinutes = (m: number) => {
    const hours = Math.floor(m / 60);
    const minutes = m % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}`;
  };

  const startMinutes = toMinutes(start);
  const endMinutes = toMinutes(end);
  for (let m = startMinutes; m <= endMinutes; m += interval) {
    options.push(fromMinutes(m));
  }
  return options;
};

const timeOptions = generateTimeOptions("09:00", "21:00", 45); // 45-minute intervals

const TimeInput: React.FC<TimePickerProps> = ({
  time,
  setTime,
  bookedTimes,
}) => {
  console.log(bookedTimes);
  console.log(time);
  return (
    <label className="block mt-2">
      Select Time:
      <select
        value={time}
        onChange={(e) => setTime(e.target.value)}
        aria-label="Choose time"
        className="w-full border"
      >
        {timeOptions.map((time) => (
          <option
            key={time}
            value={time}
            disabled={bookedTimes.includes(time)}
            className={`${bookedTimes.includes(time) && "text-red-600"}`}
          >
            {time}
          </option>
        ))}
      </select>
      {bookedTimes.includes(time || "") && (
        <p className="text-red-500">This time slot is already booked</p>
      )}
    </label>
  );
};

export default TimeInput;
