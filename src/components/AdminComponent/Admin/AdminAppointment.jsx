import { useEffect, useState } from "react";

import axios from "axios";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);

  const [search, setSearch] = useState("");

  // token
  const token = localStorage.getItem("token");

  // fetch appointments
  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3100/api/admin/appointments",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setAppointments(response.data.Appointments);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // search
  const filtered = appointments.filter((item) =>
    item.patientId?.name?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      {/* Top */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200">
        <h2 className="text-lg font-semibold text-slate-800">Appointments</h2>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search appointments..."
          className="px-3.5 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 w-52 bg-white"
        />
      </div>

      {/* Table */}
      <div className="p-6">
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                  Patient
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                  Doctor
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                  Date
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                  Time
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-slate-50 hover:bg-slate-50"
                >
                  <td className="px-5 py-4 text-sm font-medium text-slate-800">
                    {item.patientId?.name}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {item.doctorId?.userId?.name}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {item.date}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {item.time}
                  </td>

                  <td className="px-5 py-4">
                    <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
