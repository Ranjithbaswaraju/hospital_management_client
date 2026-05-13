import { useEffect, useState } from "react";

import axios from "axios";

export default function Patients() {
  const [patients, setPatients] = useState([]);

  const [search, setSearch] = useState("");

  // token
  const token = localStorage.getItem("token");

  // fetch patients
  const fetchPatients = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3100/api/admin/patients",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setPatients(response.data.patients);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // search filter
  const filtered = patients.filter((patient) =>
    patient.name?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      {/* Top */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200">
        <h2 className="text-lg font-semibold text-slate-800">Patients</h2>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search patients..."
          className="px-3.5 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 w-52 bg-white"
        />
      </div>

      {/* Patients Table */}
      <div className="p-6">
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                  Name
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                  Email
                </th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((patient) => (
                <tr
                  key={patient._id}
                  className="border-b border-slate-50 hover:bg-slate-50"
                >
                  <td className="px-5 py-4 text-sm font-medium text-slate-800">
                    {patient.name}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {patient.email}
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
