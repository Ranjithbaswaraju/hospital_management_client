import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";

// sidebar links
const navItems = [
  {
    to: "/doctor/appointments",
    icon: "📅",
    label: "Appointments",
  },

  {
    to: "/doctor/schedule",
    icon: "🕐",
    label: "My Schedule",
  },

  {
    to: "/doctor/profile",
    icon: "👤",
    label: "Profile",
  },
];

export default function DoctorLayout() {
  const navigate = useNavigate();

  const Logout = () => {
    localStorage.removeItem("token");

    alert("Logout Successfully");

    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-52 bg-[#0f3d7a] flex flex-col z-50">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 py-6 text-white font-bold text-base">
          <span className="text-xl">🩺</span>
          MediBook
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg mb-1 text-sm transition-all ${
                  isActive
                    ? "bg-white/15 text-white font-medium"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                }`
              }
            >
              {/* icon */}
              <span className="text-base">{item.icon}</span>

              {/* label */}
              {item.label}
            </NavLink>
          ))}

          {/* line */}
          <div className="mx-2 my-3 border-t border-white/10" />

         
          

          {/* logout */}
          <button
            onClick={Logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/10 transition-all"
          >
            <span>🚪</span>
            Sign out
          </button>
        </nav>

        {/* doctor info */}
        <div className="px-5 py-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            {/* doctor initials */}
            <div className="w-9 h-9 rounded-full bg-blue-400/30 text-white flex items-center justify-center text-xs font-bold">
              RS
            </div>

            {/* doctor details */}
            <div>
              <p className="text-white text-xs font-medium">Dr. Ravi Sharma</p>

              <p className="text-white/50 text-xs">Cardiologist</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Right Side */}
      <div className="flex-1 flex flex-col min-h-screen ml-52">
        {/* Page Content */}
        <main className="flex-1 min-h-[85vh] p-6">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
