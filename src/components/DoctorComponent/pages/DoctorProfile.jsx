import axios from "axios";
import { useEffect, useState } from "react";

export default function DoctorProfile() {

  const [profile, setProfile] = useState({});

  const fetchProfile = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:3100/api/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile(response.data.user);

    } catch (err) {

      console.log(err);

    }
  };

  useEffect(() => {

    fetchProfile();

  }, []);

  return (

    <div className="p-8">

      <div className="bg-white rounded-2xl shadow p-8 max-w-3xl">

        {/* Top */}
        <div className="flex items-center gap-6 mb-8">

          <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-3xl font-bold">

            {profile.name?.charAt(0)}

          </div>



          <div>

            <h1 className="text-3xl font-bold">
              Dr. {profile.name}
            </h1>

            <p className="text-slate-500 mt-1">
              {profile.specialization}
            </p>

          </div>

        </div>



        {/* Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>

            <p className="text-sm text-slate-500">
              Email
            </p>

            <h2 className="font-medium">
              {profile.email}
            </h2>

          </div>



          <div>

            <p className="text-sm text-slate-500">
              Phone
            </p>

            <h2 className="font-medium">
              {profile.phone}
            </h2>

          </div>



          <div>

            <p className="text-sm text-slate-500">
              Experience
            </p>

            <h2 className="font-medium">
              {profile.experience} Years
            </h2>

          </div>



          <div>

            <p className="text-sm text-slate-500">
              Qualification
            </p>

            <h2 className="font-medium">
              {profile.qualification}
            </h2>

          </div>

        </div>

      </div>

    </div>
  );
}