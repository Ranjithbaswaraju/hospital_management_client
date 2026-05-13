import { useEffect, useState } from "react";

import axios from "axios";

const STATUS_COLORS = {
  upcoming: "bg-blue-50 text-blue-700",

  completed: "bg-green-50 text-green-700",

  cancelled: "bg-red-50 text-red-600",

  pending: "bg-amber-50 text-amber-700",
};

function NoteModal({ appointment, onSave, onClose }) {
  const [note, setNote] = useState("");

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800">Add Note</h3>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <textarea
            rows={4}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Enter notes..."
            className="w-full px-3.5 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 resize-none"
          />

          <div className="flex gap-3 mt-4">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>

            <button
              onClick={() => onSave(note)}
              className="flex-1 py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
            >
              Mark Completed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);

  const [activeFilter, setActiveFilter] = useState("All");

  const [noteModal, setNoteModal] = useState(null);

  const token = localStorage.getItem("token");

  // fetch appointments
  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3100/api/doctor/appointments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setAppointments(response.data.appointments);
    } catch (err) {
      console.log(err);

      alert("Unable to fetch appointments");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // update status
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:3100/api/doctor/appointments/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setAppointments((prev) =>
        prev.map((a) => (a._id === id ? { ...a, status } : a)),
      );

      setNoteModal(null);
    } catch (err) {
      console.log(err);

      alert("Unable to update appointment");
    }
  };

  // filter data
  const displayed = appointments.filter((a) =>
    activeFilter === "All"
      ? true
      : a.status?.toLowerCase() === activeFilter.toLowerCase(),
  );

  // stats
  const stats = {
    today: appointments.length,

    completed: appointments.filter(
      (a) => a.status?.toLowerCase() === "completed",
    ).length,

    cancelled: appointments.filter(
      (a) => a.status?.toLowerCase() === "cancelled",
    ).length,
  };

  return (
    <>
      {/* Topbar */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200">
        <h2 className="text-lg font-semibold text-slate-800">Appointments</h2>
      </div>

      <div className="p-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <div className="text-2xl font-bold text-blue-700 mb-0.5">
              {stats.today}
            </div>

            <div className="text-xs text-slate-500">Total</div>
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

        {/* Filters */}
        <div className="flex gap-2 mb-5">
          {["All", "Upcoming", "Pending", "Completed", "Cancelled"].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                activeFilter === f
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
          {displayed.map((appt) => (
            <div
              key={appt._id}
              className="bg-white border border-slate-200 rounded-xl px-5 py-4 flex items-center gap-4"
            >
              {/* initials */}
              <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
                {appt.patientId?.name?.charAt(0)}
              </div>

              {/* details */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-slate-800 text-sm">
                  {appt.patientId?.name}
                </h4>

                <p className="text-xs text-slate-500 mt-0.5">
                  {appt.date}
                  {" · "}
                  {appt.time}
                </p>
              </div>

              {/* status */}
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  STATUS_COLORS[appt.status?.toLowerCase()]
                }`}
              >
                {appt.status}
              </span>

              {/* buttons */}
              {(appt.status?.toLowerCase() === "upcoming" ||
                appt.status?.toLowerCase() === "pending") && (
                <div className="flex gap-2">
                  <button
                    onClick={() => setNoteModal(appt)}
                    className="px-3 py-1.5 bg-green-50 text-green-700 text-xs font-medium rounded-lg hover:bg-green-100 transition-colors"
                  >
                    ✓ Complete
                  </button>

                  <button
                    onClick={() => updateStatus(appt._id, "Cancelled")}
                    className="px-3 py-1.5 bg-red-50 text-red-600 text-xs font-medium rounded-lg hover:bg-red-100 transition-colors"
                  >
                    ✕ Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Note Modal */}
      {noteModal && (
        <NoteModal
          appointment={noteModal}
          onSave={() => updateStatus(noteModal._id, "Completed")}
          onClose={() => setNoteModal(null)}
        />
      )}
    </>
  );
}
