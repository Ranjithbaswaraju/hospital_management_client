import { useEffect, useState } from "react";
import axios from "axios";
import { BaseUrl } from "../../confige";
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

export default function DoctorAppointments() {

  const [appointments, setAppointments] = useState([]);

  const [filter, setFilter] = useState("All");

  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // fetch doctor appointments
  const fetchAppointments = async () => {
    try {

      setLoading(true);

      const response = await axios.get(
        `${BaseUrl}/api/doctor/appointments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      setAppointments(response.data.appointments);

    } catch (err) {
      console.log(err);

      toast.error("Unable To Fetch Appointments",{autoClose: 3000});

    } finally {
      setLoading(false);
    }
  };

  // update appointment status
  const UpdateStatus = async (id, status) => {
    try {

      const response = await axios.put(
        `${BaseUrl}/api/doctor/update-status/${id}`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log(response.data);

      toast.success(`Appointment ${status}`,{autoClose: 3000});

      fetchAppointments();

    } catch (err) {
      console.log(err);

      toast.error("Unable To Update Status",{autoClose: 3000});
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
        Doctor Appointments
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">

        {/* Total */}
        <div className="bg-white border border-slate-200 rounded-xl p-4">

          <div className="text-2xl font-bold text-blue-700">
            {stats.total}
          </div>

          <div className="text-xs text-slate-500">
            Total
          </div>

        </div>

        {/* Booked */}
        <div className="bg-white border border-slate-200 rounded-xl p-4">

          <div className="text-2xl font-bold text-blue-700">
            {stats.booked}
          </div>

          <div className="text-xs text-slate-500">
            Booked
          </div>

        </div>

        {/* Completed */}
        <div className="bg-white border border-slate-200 rounded-xl p-4">

          <div className="text-2xl font-bold text-green-700">
            {stats.completed}
          </div>

          <div className="text-xs text-slate-500">
            Completed
          </div>

        </div>

        {/* Cancelled */}
        <div className="bg-white border border-slate-200 rounded-xl p-4">

          <div className="text-2xl font-bold text-red-600">
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

              {/* Patient Initial */}
              <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">

                {
                  appt.patientId?.name?.charAt(0)
                }

              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">

                <h4 className="font-semibold text-slate-800 text-sm">

                  {
                    appt.patientId?.name
                  }

                </h4>

                <p className="text-xs text-slate-500 mt-0.5">

                  {
                    appt.slotId?.date
                  }

                  {" · "}

                  {
                    appt.slotId?.time
                  }

                </p>

              </div>

              {/* Status + Actions */}
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
                  appt.status === "Booked" && (
                    <div className="flex gap-2">

                      {/* Complete */}
                      <button
                        onClick={() =>
                          UpdateStatus(
                            appt._id,
                            "Completed"
                          )
                        }
                        className="bg-green-600 text-white text-xs px-3 py-1 rounded-lg hover:bg-green-700"
                      >
                        Complete
                      </button>

                      {/* Cancel */}
                      <button
                        onClick={() =>
                          UpdateStatus(
                            appt._id,
                            "Cancelled"
                          )
                        }
                        className="bg-red-600 text-white text-xs px-3 py-1 rounded-lg hover:bg-red-700"
                      >
                        Cancel
                      </button>

                    </div>
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