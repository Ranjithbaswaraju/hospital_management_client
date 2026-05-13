import { useEffect, useState } from "react";

import axios from "axios";

const STATUS_COLORS = {
  upcoming: "bg-blue-50 text-blue-700",
  completed: "bg-green-50 text-green-700",
  cancelled: "bg-red-50 text-red-600",
};

const FILTERS = ["All", "Upcoming", "Completed", "Cancelled"];

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);

  const [filter, setFilter] = useState("All");

  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // fetch appointments
  const fetchAppointments = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:3100/api/appointment/my-appointment",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setAppointments(response.data.appointments);
      console.log(response.data.appointments);
    } catch (err) {
      console.log(err);

      alert("Unable to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // filter appointments
  const displayed = appointments.filter((a) => {
    return filter === "All" || a.status?.toLowerCase() === filter.toLowerCase();
  });

  // stats
  const stats = {
    total: appointments.length,

    upcoming: appointments.filter((a) => a.status?.toLowerCase() === "upcoming")
      .length,

    completed: appointments.filter(
      (a) => a.status?.toLowerCase() === "completed",
    ).length,

    cancelled: appointments.filter(
      (a) => a.status?.toLowerCase() === "cancelled",
    ).length,
  };

  return (
    <div>
      {/* Heading */}
      <h1 className="text-2xl font-bold text-slate-800 mb-6">
        My Appointments
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="text-2xl font-bold text-blue-700 mb-0.5">
            {stats.total}
          </div>

          <div className="text-xs text-slate-500">Total Booked</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="text-2xl font-bold text-blue-700 mb-0.5">
            {stats.upcoming}
          </div>

          <div className="text-xs text-slate-500">Upcoming</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="text-2xl font-bold text-green-700 mb-0.5">
            {stats.completed}
          </div>

          <div className="text-xs text-slate-500">Completed</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="text-2xl font-bold text-red-600 mb-0.5">
            {stats.cancelled}
          </div>

          <div className="text-xs text-slate-500">Cancelled</div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-5">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
              filter === f
                ? "bg-blue-50 text-blue-700 border-blue-200"
                : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Appointment List */}
      <div className="space-y-3">
        {loading ? (
          <div className="text-center py-16 text-slate-400">Loading...</div>
        ) : displayed.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            No appointments found
          </div>
        ) : (
          displayed.map((appt) => (
            <div
              key={appt._id}
              className="bg-white border border-slate-200 rounded-xl px-5 py-4 flex items-center gap-4"
            >
              {/* Initial */}
              <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
                {appt.doctorId?.userId?.name?.charAt(0)}
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-slate-800 text-sm">
                  {appt.doctorId?.userId?.name}
                </h4>

                <p className="text-xs text-slate-500 mt-0.5">
                  {appt.doctorId?.specialization}
                  {" · "}
                  {appt.date}
                  {" · "}
                  {appt.time}
                </p>
              </div>

              {/* Status */}
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  STATUS_COLORS[appt.status?.toLowerCase()]
                }`}
              >
                {appt.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
