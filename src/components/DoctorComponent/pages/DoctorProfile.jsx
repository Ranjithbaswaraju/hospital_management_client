import { useEffect, useState } from "react";

import axios from "axios";
import { BaseUrl } from "../../confige";

const Profile = () => {

  const [doctor, setDoctor] =
    useState(null);

  const token =
    localStorage.getItem("token");

  const fetchProfile = async () => {
    try {

      const response =
        await axios.get(
          `${BaseUrl}/api/doctor/profile`,

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      console.log(response.data);

      setDoctor(
        response.data.doctor
      );

    } catch (err) {

      console.log(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!doctor) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6">

      <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-md">

        <div className="flex flex-col items-center text-center">

          <img
            src={`${BaseUrl}/uploads/${doctor.image}`}
            alt="doctor"
            className="w-24 h-24 rounded-full object-cover mb-4"
          />

          <h2 className="text-xl font-bold text-slate-800">
            {doctor.userId?.name}
          </h2>

          <p className="text-sm text-slate-500 mb-3">
            {doctor.specialization}
          </p>

          <div className="space-y-2 text-sm text-slate-600">

            <p>
              <strong>Email:</strong>
              {" "}
              {doctor.userId?.email}
            </p>

            <p>
              <strong>Experience:</strong>
              {" "}
              {doctor.experience} Years
            </p>

            <p>
              <strong>Fees:</strong>
              {" "}
              ₹{doctor.fees}
            </p>

            <p>
              <strong>Hospital:</strong>
              {" "}
              {doctor.hospital}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;