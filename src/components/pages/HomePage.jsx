import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <section className="bg-gradient-to-r from-blue-50 to-cyan-50 min-h-[90vh] flex items-center">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight text-slate-900">
            Your Health,
            <span className="text-blue-600"> Our Priority</span>
          </h1>

          <p className="text-slate-600 text-lg mt-6 leading-8 max-w-xl">
            Book appointments with trusted doctors instantly. Access quality
            healthcare from the comfort of your home with MediBook Hospital
            Management System.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-8">
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-medium transition-all shadow-lg"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="border border-slate-300 hover:bg-slate-100 text-slate-700 px-8 py-4 rounded-xl text-lg font-medium transition-all"
            >
              Register
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-10 mt-12 flex-wrap">
            <div>
              <h2 className="text-3xl font-bold text-blue-600">100+</h2>

              <p className="text-slate-500 mt-1">Expert Doctors</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-blue-600">24/7</h2>

              <p className="text-slate-500 mt-1">Emergency Support</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-blue-600">10k+</h2>

              <p className="text-slate-500 mt-1">Happy Patients</p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=1200&auto=format&fit=crop"
            alt="Doctor"
            className="rounded-3xl shadow-2xl w-full max-w-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
}
