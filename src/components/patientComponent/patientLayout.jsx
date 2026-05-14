import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import { toast } from "react-toastify";

const navItems = [
  { to: "/patient/browse", label: "Find a Doctor" },
  { to: "/patient/appointments", label: "My Appointments" },
];

export default function PatientLayout() {
  const navigate = useNavigate();

  const Logout = () => {
    localStorage.removeItem("token");

    toast.success("Logout Successfully",{autoClose: 3000});

    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 text-blue-700 font-bold text-lg">
            <span className="text-2xl">🩺</span>
            MediBook
          </div>

          {/* Navigation */}
          <nav className="flex gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Profile */}
          <div className="flex items-center gap-3">
            <button className="text-slate-400 hover:text-slate-600 text-xl">
              🔔
            </button>

            <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
              AS
            </div>

            <button
              onClick={Logout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 min-h-[80vh] max-w-7xl mx-auto px-6 py-8 w-full">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
