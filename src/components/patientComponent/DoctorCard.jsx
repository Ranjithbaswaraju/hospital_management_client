export default function DoctorCard({ doctor, onBook }) {

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">

      <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xl font-bold mb-3">

        {doctor.name?.charAt(0)}

      </div>

      <h4 className="font-semibold text-slate-800 text-sm mb-1">

        {doctor.name}

      </h4>

      <span className="inline-block bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full mb-2">

        {doctor.specialization}

      </span>

      <p className="text-xs text-slate-500 mb-4">

        ★ {doctor.rating || 4.5}
        {" · "}
        {doctor.experience || 5} yrs exp
        {" · "}
        ₹{doctor.fee || 500}

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