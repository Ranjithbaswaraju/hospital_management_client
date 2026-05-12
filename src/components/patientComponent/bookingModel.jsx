import { useEffect, useState } from "react";
import axios from "axios";

export default function BookingModal({ doctor, onClose }) {

  const [date, setDate] = useState("");

  const [slot, setSlot] = useState("");

  const [reason, setReason] = useState("");

  const [booked, setBooked] = useState(false);

  const [slots, setSlots] = useState([]);




  // fetch slots from backend
  const fetchSlots = async (selectedDate) => {

    try {

      const response = await axios.get(
        `http://localhost:3100/api/patient/slots/${doctor._id}/${selectedDate}`
      );

      setSlots(response.data.slots);

    } catch (err) {

      console.log(err);

      alert("Unable to fetch slots");

    }
  };




  // fetch slots when date changes
  useEffect(() => {

    if (date) {

      fetchSlots(date);

    }

  }, [date]);




  const handleBook = () => {

    if (!date || !slot) {

      alert("Please select date and slot");

      return;
    }

    setBooked(true);
  };




  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl">

        {
          booked ? (

            <div className="p-10 text-center">

              <div className="text-5xl mb-4">
                ✅
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                Appointment Confirmed!
              </h3>

              <p className="text-sm text-slate-500 mb-1">

                <strong>{doctor.name}</strong>
                {" — "}
                {slot}
                {" on "}
                {date}

              </p>

              <p className="text-sm text-blue-600 mb-6">
                📧 A confirmation email has been sent to you.
              </p>

              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Done
              </button>

            </div>

          ) : (

            <>
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">

                <div>

                  <h3 className="font-semibold text-slate-800">
                    Book Appointment
                  </h3>

                  <p className="text-sm text-slate-500">

                    {doctor.name}
                    {" · "}
                    {doctor.specialization}

                  </p>

                </div>

                <button
                  onClick={onClose}
                  className="text-slate-400 hover:text-slate-600 text-xl"
                >
                  ✕
                </button>

              </div>




              <div className="p-6 space-y-4">

                <div className="grid grid-cols-2 gap-4">

                  {/* Date */}
                  <div>

                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">

                      Select Date

                    </label>

                    <input
                      type="date"
                      value={date}
                      onChange={(e) =>
                        setDate(e.target.value)
                      }
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500"
                    />

                  </div>




                  {/* Dynamic Slots */}
                  <div>

                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">

                      Available Slot

                    </label>

                    <select
                      value={slot}
                      onChange={(e) =>
                        setSlot(e.target.value)
                      }
                      className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500 bg-white"
                    >

                      <option value="">
                        Select slot
                      </option>

                      {
                        slots.map((s) => (

                          <option
                            key={s._id}
                            value={s.time}
                          >

                            {s.time}

                          </option>
                        ))
                      }

                    </select>

                  </div>

                </div>




                {/* Reason */}
                <div>

                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">

                    Reason for Visit (optional)

                  </label>

                  <input
                    value={reason}
                    onChange={(e) =>
                      setReason(e.target.value)
                    }
                    placeholder="Brief description of symptoms..."
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500"
                  />

                </div>




                {/* Info */}
                <div className="flex items-start gap-2.5 bg-blue-50 rounded-lg px-4 py-3">

                  <span className="text-blue-600 text-sm mt-0.5">
                    📧
                  </span>

                  <p className="text-sm text-blue-700">
                    A confirmation email will be sent to your registered address after booking.
                  </p>

                </div>




                {/* Fee */}
                <div className="flex items-center justify-between pt-1">

                  <div>

                    <span className="text-sm text-slate-500">
                      Consultation fee
                    </span>

                    <span className="ml-2 text-base font-bold text-slate-800">

                      ₹{doctor.fees || 500}

                    </span>

                  </div>

                  <button
                    onClick={handleBook}
                    disabled={!date || !slot}
                    className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >

                    Confirm Booking

                  </button>

                </div>

              </div>
            </>
          )
        }

      </div>
    </div>
  );
}