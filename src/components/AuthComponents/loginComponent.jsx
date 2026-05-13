import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../confige";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${BaseUrl}/api/auth/login`,
        {
          email,
          password,
        },
      );

      console.log(response.data);

      // store token
      localStorage.setItem("token", response.data.token);

      // store user
      localStorage.setItem("user", JSON.stringify(response.data.user));

      alert(response.data.message);

      // role based navigation
      const role = response.data.user.role;

      if (role === "admin") {
        navigate("/admin");
      } else if (role === "doctor") {
        navigate("/doctor");
      } else {
        navigate("/patient");
      }
    } catch (err) {
      console.log(err);

      if (err.response?.data?.message === "User Not Found") {
        alert("User Not Found");
      } else if (err.response?.data?.message === "Invalid Credentials") {
        alert("Invalid Email or Password");
      } else {
        alert(err.response?.data?.message || "Unable to Login");
      }
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
            Your health,
            <br />
            our priority
          </h2>

          <p className="text-sm text-blue-100 mb-8 leading-relaxed">
            Book appointments with top doctors across 10+ specializations — from
            the comfort of your home.
          </p>

          {[
            { icon: "📅", text: "Instant slot booking" },
            { icon: "📧", text: "Email confirmations" },
            { icon: "✅", text: "Verified doctors only" },
          ].map((f) => (
            <div
              key={f.text}
              className="flex items-center gap-3 mb-4 text-sm text-blue-50"
            >
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-base shrink-0">
                {f.icon}
              </div>

              {f.text}
            </div>
          ))}
        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-white p-10 flex flex-col justify-center">
          <h3 className="text-xl font-semibold text-slate-800 mb-1">
            Welcome back
          </h3>

          <p className="text-sm text-slate-500 mb-7">
            Sign in to your MediBook account
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
                Email address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Remember */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-slate-500 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Remember me
              </label>

              <span className="text-sm text-blue-600 cursor-pointer hover:underline">
                Forgot password?
              </span>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors mt-1"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-5">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-medium hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
