import { useEffect, useState } from "react";
import axios from "axios";
import { BaseUrl } from "../confige";
import { toast } from "react-toastify";

const STATUS_COLORS = {
  booked: "bg-blue-50 text-blue-700",
  completed: "bg-green-50 text-green-700",
  cancelled: "bg-red-50 text-red-600",
};

const FILTERS = [
  "All",
  "Booked",
  "Completed",
  "Cancelled",
];

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
        `${BaseUrl}/api/appointment/my-appointment`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(response.data);

      setAppointments(response.data.appointments);

    } catch (err) {
      console.log(err);

      toast.error("Unable to fetch appointments",{autoClose: 3000});

    } finally {
      setLoading(false);
    }
  };

  // cancel appointment
  const CancelAppointment = async (id) => {
    try {

      const response = await axios.put(
        `${BaseUrl}/api/appointment/cancel/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      toast.success("Appointment Cancelled Successfully",{autoClose: 3000});

      fetchAppointments();

    } catch (err) {
      console.log(err);

      toast.error("Unable To Cancel Appointment",{autoClose: 3000});
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // filter appointments
  const displayed = appointments.filter((a) => {
    return (
      filter === "All" ||
      a.status?.toLowerCase() ===
        filter.toLowerCase()
    );
  });

  // stats
  const stats = {

    total: appointments.length,

    booked: appointments.filter(
      (a) =>
        a.status?.toLowerCase() ===
        "booked"
    ).length,

    completed: appointments.filter(
      (a) =>
        a.status?.toLowerCase() ===
        "completed"
    ).length,

    cancelled: appointments.filter(
      (a) =>
        a.status?.toLowerCase() ===
        "cancelled"
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

        {/* Total */}
        <div className="bg-white border border-slate-200 rounded-xl p-4">

          <div className="text-2xl font-bold text-blue-700 mb-0.5">
            {stats.total}
          </div>

          <div className="text-xs text-slate-500">
            Total
          </div>

        </div>

        {/* Booked */}
        <div className="bg-white border border-slate-200 rounded-xl p-4">

          <div className="text-2xl font-bold text-blue-700 mb-0.5">
            {stats.booked}
          </div>

          <div className="text-xs text-slate-500">
            Booked
          </div>

        </div>

        {/* Completed */}
        <div className="bg-white border border-slate-200 rounded-xl p-4">

          <div className="text-2xl font-bold text-green-700 mb-0.5">
            {stats.completed}
          </div>

          <div className="text-xs text-slate-500">
            Completed
          </div>

        </div>

        {/* Cancelled */}
        <div className="bg-white border border-slate-200 rounded-xl p-4">

          <div className="text-2xl font-bold text-red-600 mb-0.5">
            {stats.cancelled}
          </div>

          <div className="text-xs text-slate-500">
            Cancelled
          </div>

        </div>

      </div>

      {/* Filters */}
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

          <div className="text-center py-16 text-slate-400">
            Loading...
          </div>

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

              {/* Doctor Initial */}
              <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">

                {
                  appt.doctorId?.userId?.name?.charAt(0)
                }

              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">

                <h4 className="font-semibold text-slate-800 text-sm">

                  {
                    appt.doctorId?.userId?.name
                  }

                </h4>

                <p className="text-xs text-slate-500 mt-0.5">

                  {
                    appt.doctorId?.specialization
                  }

                  {" · "}

                  {
                    appt.slotId?.date
                  }

                  {" · "}

                  {
                    appt.slotId?.time
                  }

                </p>

              </div>

              {/* Status + Cancel */}
              <div className="flex flex-col items-end gap-2">

                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    STATUS_COLORS[
                      appt.status?.toLowerCase()
                    ]
                  }`}
                >
                  {appt.status}
                </span>

                {
                  appt.status !==
                    "Cancelled" && (

                    <button
                      onClick={() =>
                        CancelAppointment(
                          appt._id
                        )
                      }
                      className="bg-red-600 text-white text-xs px-3 py-1 rounded-lg hover:bg-red-700"
                    >
                      Cancel
                    </button>

                  )
                }

              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
}