import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    DOB: "",
    phone: "",
    email: "",
    password: "",
    confirm: "",
    role: "patient",
  });

  const handle = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirm) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3100/api/auth/register",
        {
          name: form.name,
          DOB: form.DOB,
          phone: form.phone,
          email: form.email,
          password: form.password,
          role: form.role,
        },
      );

      console.log(response.data);

      alert(response.data.message);

      navigate("/login");
    } catch (err) {
      console.log(err);

      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-4xl flex rounded-2xl overflow-hidden shadow-lg border border-slate-200">
        {/* Left Panel */}
        <div className="hidden md:flex flex-col justify-center w-5/12 bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 p-10 text-white">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl">
              🩺
            </div>

            <span className="text-xl font-bold tracking-tight">MediBook</span>
          </div>

          <h2 className="text-2xl font-bold mb-3 leading-snug">
            Join MediBook
            <br />
            today
          </h2>

          <p className="text-sm text-blue-100 mb-8 leading-relaxed">
            Register and manage appointments easily with verified doctors.
          </p>

          {[
            { icon: "⏱️", text: "Book in under 2 minutes" },
            { icon: "📋", text: "Track appointment history" },
            { icon: "🔄", text: "Easy cancellation & rebooking" },
          ].map((f) => (
            <div
              key={f.text}
              className="flex items-center gap-3 mb-4 text-sm text-blue-50"
            >
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                {f.icon}
              </div>

              {f.text}
            </div>
          ))}
        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-white p-10 flex flex-col justify-center">
          <h3 className="text-xl font-semibold text-slate-800 mb-1">
            Create your account
          </h3>

          <p className="text-sm text-slate-500 mb-7">Register to get started</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
                Full Name
              </label>

              <input
                value={form.name}
                onChange={handle("name")}
                placeholder="Ranjith"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
                Email address
              </label>

              <input
                type="email"
                value={form.email}
                onChange={handle("email")}
                placeholder="you@example.com"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Phone + DOB */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
                  Phone
                </label>

                <input
                  value={form.phone}
                  onChange={handle("phone")}
                  placeholder="+91 9876543210"
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
                  Date of Birth
                </label>

                <input
                  type="date"
                  value={form.DOB}
                  onChange={handle("DOB")}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
                Role
              </label>

              <select
                value={form.role}
                onChange={handle("role")}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500 transition-colors"
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Password */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
                  Password
                </label>

                <input
                  type="password"
                  value={form.password}
                  onChange={handle("password")}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
                  Confirm password
                </label>

                <input
                  type="password"
                  value={form.confirm}
                  onChange={handle("confirm")}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              Create account
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-5">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
