import { useState } from "react";

import axios from "axios";
import { BaseUrl } from "../../confige";

export default function DoctorSchedule() {
  const [activeDays, setActiveDays] = useState([]);

  const [slots, setSlots] = useState([]);

  const [saved, setSaved] = useState(false);

  const [date, setDate] = useState("");

  const [startTime, setStartTime] = useState("");

  const [endTime, setEndTime] = useState("");

  const token = localStorage.getItem("token");

  // days from backend schema
  const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // toggle days
  const toggleDay = (day) => {
    if (activeDays.includes(day)) {
      setActiveDays(activeDays.filter((d) => d !== day));
    } else {
      setActiveDays([...activeDays, day]);
    }
  };

  // save schedule
  const handleSave = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log(typeof user)
      const doctorId = user?._id
      console.log(doctorId)
      const response = await axios.post(
        `${BaseUrl}/api/doctor/add-slot`,

        {
          doctorId,

          date,

          startTime,

          endTime,

          days: activeDays,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // backend generated slots
      setSlots(response.data.slots);

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 3000);
    } catch (err) {
      console.log(err);

      alert("Unable to save schedule");
    }
  };

  return (
    <>
      {/* Topbar */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200">
        <h2 className="text-lg font-semibold text-slate-800">My Schedule</h2>

        <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
          RS
        </div>
      </div>

      <div className="p-6">
        <p className="text-sm text-slate-500 mb-6">
          Set the days and time slots when you are available each week. Patients
          will only be able to book during these windows.
        </p>

        {/* Summary */}
        <div className="flex gap-3 mb-6">
          <div className="bg-blue-50 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full">
            {activeDays.length} working days
          </div>

          <div className="bg-green-50 text-green-700 text-sm font-medium px-4 py-1.5 rounded-full">
            {slots.length} slots open
          </div>
        </div>

        {/* Working Days */}
        <h3 className="font-semibold text-slate-800 mb-3">Working Days</h3>

        <div className="grid grid-cols-7 gap-2 mb-6">
          {DAYS.map((day) => (
            <button
              key={day}
              onClick={() => toggleDay(day)}
              className={`py-3 rounded-xl text-center transition-all border ${
                activeDays.includes(day)
                  ? "border-blue-500 bg-blue-50 text-blue-700 font-semibold"
                  : "border-slate-200 bg-white text-slate-400 hover:border-slate-300"
              }`}
            >
              <div className="text-xs font-semibold mb-1">{day}</div>

              <div
                className={`text-[10px] font-medium ${
                  activeDays.includes(day) ? "text-blue-500" : "text-slate-400"
                }`}
              >
                {activeDays.includes(day) ? "On" : "Off"}
              </div>
            </button>
          ))}
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-2">
              Date
            </label>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 block mb-2">
              Start Time
            </label>

            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 block mb-2">
              End Time
            </label>

            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Available Time Slots */}
        <h3 className="font-semibold text-slate-800 mb-3">
          Available Time Slots
        </h3>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-5">
          {/* Legend */}
          <div className="flex items-center gap-4 mb-4 text-xs text-slate-500 flex-wrap">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-blue-600 inline-block"></span>
              Selected (open)
            </span>

            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-slate-100 border border-slate-200 inline-block"></span>
              Backend Generated Slots
            </span>
          </div>

          {/* Slots from backend */}
          <div className="flex flex-wrap gap-2">
            {slots.map((slot) => (
              <button
                key={slot._id}
                className="px-3 py-2 rounded-lg text-xs font-medium border border-blue-500 bg-blue-600 text-white"
              >
                {slot.time}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            Save Schedule
          </button>

          <button
            onClick={() => {
              setSlots([]);

              setActiveDays([]);

              setDate("");

              setStartTime("");

              setEndTime("");
            }}
            className="px-6 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm hover:bg-slate-50 transition-colors"
          >
            Reset
          </button>

          {saved && (
            <span className="text-sm text-green-700 bg-green-50 px-4 py-2 rounded-lg font-medium">
              ✅ Schedule saved!
            </span>
          )}
        </div>
      </div>
    </>
  );
}
