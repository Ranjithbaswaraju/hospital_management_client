import { useEffect, useState } from "react";

import axios from "axios";

// specialization list
const specializations = [
  "Cardiology",

  "Dermatology",

  "Neurology",

  "Orthopaedics",

  "Paediatrics",

  "Gynaecology and obstetrics",

  "ENT",

  "Ophthalmology",

  "Psychiatry and mental health",
];

function AddDoctorModal({
  onClose,

  fetchDoctors,

  token,
}) {
  const [form, setForm] = useState({
    name: "",

    email: "",

    password: "",

    specialization: "",

    experience: "",

    fees: "",

    hospital: "",
  });

  // handle input
  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  // add doctor
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:3100/api/admin/add-doctor",

        form,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchDoctors();

      onClose();
    } catch (err) {
      console.log(err);

      alert("Unable to Add Doctor");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800">Add New Doctor</h3>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Doctor Name"
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg"
          />

          {/* Specialization */}
          <select
            name="specialization"
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white"
          >
            <option value="">Select Specialization</option>

            {specializations.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="experience"
            placeholder="Experience"
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg"
          />

          <input
            type="number"
            name="fees"
            placeholder="Fees"
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg"
          />

          <input
            type="text"
            name="hospital"
            placeholder="Hospital"
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg"
          />

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-slate-200 rounded-lg text-sm"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 py-2.5 bg-blue-600 text-white rounded-lg text-sm"
            >
              Add Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ManageDoctors() {
  const [doctors, setDoctors] = useState([]);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  // token
  const token = localStorage.getItem("token");

  // fetch doctors
  const fetchDoctors = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3100/api/admin/doctors",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setDoctors(response.data.doctors);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // delete doctor
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3100/api/admin/delete-doctor/${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchDoctors();
    } catch (err) {
      console.log(err);
    }
  };

  // search
  const filtered = doctors.filter((doc) =>
    doc.specialization?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      {/* Top */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200">
        <h2 className="text-lg font-semibold text-slate-800">Manage Doctors</h2>

        <div className="flex items-center gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search doctors..."
            className="px-3.5 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 w-52 bg-white"
          />

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            + Add Doctor
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="p-6">
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                  Doctor
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                  Specialization
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                  Experience
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                  Fees
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                  Hospital
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((doc) => (
                <tr
                  key={doc._id}
                  className="border-b border-slate-50 hover:bg-slate-50"
                >
                  <td className="px-5 py-4 text-sm font-medium text-slate-800">
                    {doc.userId?.name}
                  </td>

                  <td className="px-5 py-4">
                    <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">
                      {doc.specialization}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {doc.experience} yrs
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    ₹{doc.fees}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {doc.hospital}
                  </td>

                  <td className="px-5 py-4">
                    <button
                      onClick={() => handleDelete(doc._id)}
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-red-600 hover:border-red-300 transition-colors text-sm"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <AddDoctorModal
          onClose={() => setShowModal(false)}
          fetchDoctors={fetchDoctors}
          token={token}
        />
      )}
    </>
  );
}
