
import { BaseUrl } from "../confige";


export default function DoctorCard({
  doctor,
  onBook,
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">

      <img
        src={`${BaseUrl}/uploads/${doctor.image}`}
        alt="doctor"
        className="w-16 h-16 rounded-full object-cover mb-3"
      />

      <h4 className="font-semibold text-slate-800 text-sm mb-1">
        {doctor.userId?.name}
      </h4>

      <span className="inline-block bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full mb-2">
        {doctor.specialization}
      </span>

      <p className="text-xs text-slate-500 mb-4">
        ★ 4.5
        {" · "}
        {doctor.experience} yrs exp
        {" · "}₹{doctor.fees}
      </p>

      <button
        onClick={() => onBook(doctor)}
        className="w-full py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
      >
        Book Slot
      </button>

    </div>
  );
}
