import { useEffect, useState } from "react";
import axios from "axios";

import DoctorCard from "../DoctorCard";
import BookingModal from "../bookingModel";
import { BaseUrl } from "../../confige";
import { toast } from "react-toastify";

export default function BrowseDoctors() {
  const [activeSpec, setActiveSpec] = useState("All");

  const [search, setSearch] = useState("");

  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const [doctors, setDoctors] = useState([]);

  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  // dynamic specializations from backend
  const SPECIALIZATIONS = [
    "All",

    ...new Set(doctors.map((d) => d.specialization)),
  ];

  // fetch all doctors
  const fetchDoctors = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${BaseUrl}/api/patient/doctors`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setDoctors(response.data.doctors);
    } catch (err) {
      console.log(err);

      toast.error("Unable to fetch doctors",{autoClose: 3000});
    } finally {
      setLoading(false);
    }
  };

  // filter doctors
  const filterDoctors = async (type) => {
    try {
      setActiveSpec(type);

      setLoading(true);

      if (type === "All") {
        fetchDoctors();
      } else {
        const response = await axios.get(
          `${BaseUrl}/api/patient/specialization/${type}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setDoctors(response.data.doctors);
      }
    } catch (err) {
      console.log(err);

      toast.error("Unable to filter doctors",{autoClose: 3000});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // search filter
  const filtered = doctors.filter((d) => {
    return d.specialization?.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Find a Doctor</h1>

      {/* Search Bar */}
      <div className="flex gap-3 mb-5">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by specialization..."
          className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 transition-colors bg-white"
        />

        {/* <select className="px-3 py-2.5 border border-slate-200 rounded-xl text-sm outline-none bg-white text-slate-600">
          <option>All locations</option>
          <option>Hyderabad</option>
          <option>Bangalore</option>
        </select> */}

        <select className="px-3 py-2.5 border border-slate-200 rounded-xl text-sm outline-none bg-white text-slate-600">
          <option>Any rating</option>
          <option>4★ & above</option>
          <option>4.5★ & above</option>
        </select>
      </div>

      {/* Specialization Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {SPECIALIZATIONS.map((s) => (
          <button
            key={s}
            onClick={() => filterDoctors(s)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
              activeSpec === s
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-slate-500 border-slate-200 hover:border-blue-300 hover:text-blue-600"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Doctor Grid */}
      {loading ? (
        <div className="text-center py-16 text-slate-400">
          Loading Doctors...
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          No doctors found matching your search.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((d) => (
            <DoctorCard key={d._id} doctor={d} onBook={setSelectedDoctor} />
          ))}
        </div>
      )}

      {/* Booking Modal */}
      {selectedDoctor && (
        <BookingModal
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
        />
      )}
    </div>
  );
}
