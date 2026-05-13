import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";

export default function AdminLayout() {
  const navigate = useNavigate();

  const Logout = () => {
    localStorage.removeItem("token");

    alert("Logout Successfully");

    navigate("/login");
  };

  // sidebar items
  const navItems = [
    {
      to: "/admin/overview",
      icon: "📊",
      label: "Overview",
    },

    {
      to: "/admin/doctors",
      icon: "🩺",
      label: "Doctors",
    },

    {
      to: "/admin/patients",
      icon: "👥",
      label: "Patients",
    },

    {
      to: "/admin/appointments",
      icon: "📅",
      label: "Appointments",
    },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className="w-52 shrink-0 bg-[#0a2d5a] flex flex-col">
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
              <span className="text-base">{item.icon}</span>

              {item.label}
            </NavLink>
          ))}

          {/* Line */}
          <div className="mx-2 my-3 border-t border-white/10"></div>

          {/* Settings */}
          <NavLink
            to="/admin/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/10 transition-all"
          >
            <span>⚙️</span>
            Settings
          </NavLink>

          {/* Logout */}
          <button
            onClick={Logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/10 transition-all"
          >
            <span>🚪</span>
            Sign out
          </button>
        </nav>

        {/* Bottom Admin Info */}
        <div className="px-5 py-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-400/30 text-white flex items-center justify-center text-xs font-bold">
              AD
            </div>

            <div>
              <p className="text-white text-xs font-medium">Admin</p>

              <p className="text-white/50 text-xs">Platform Manager</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Right Side */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Main Content */}
        <main className="flex-1 min-h-[85vh] p-6">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
