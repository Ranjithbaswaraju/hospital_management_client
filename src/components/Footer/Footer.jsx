export default function Footer() {
  return (
    <footer className="bg-[#0a2d5a] text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo & About */}
          <div>
            <div className="flex items-center gap-2 text-2xl font-bold mb-4">
              <span>🩺</span>
              MediBook
            </div>

            <p className="text-white/70 text-sm leading-6">
              MediBook is an online doctor appointment booking platform that
              helps patients connect with trusted doctors quickly and easily.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Quick Links</h2>

            <ul className="space-y-3 text-sm text-white/70">
              <li className="hover:text-white cursor-pointer">Home</li>

              <li className="hover:text-white cursor-pointer">Doctors</li>

              <li className="hover:text-white cursor-pointer">Appointments</li>

              <li className="hover:text-white cursor-pointer">Contact</li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Services</h2>

            <ul className="space-y-3 text-sm text-white/70">
              <li>Online Appointment Booking</li>

              <li>Doctor Consultation</li>

              <li>Patient Management</li>

              <li>Medical Support</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Contact Us</h2>

            <ul className="space-y-3 text-sm text-white/70">
              <li>📍 Hyderabad, India</li>

              <li>📞 +91 9912351561</li>

              <li>✉️ support@medibook.com</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-white/60">
          <p>© 2026 MediBook. All rights reserved.</p>

          <div className="flex gap-4 mt-4 md:mt-0">
            <span className="hover:text-white cursor-pointer">
              Privacy Policy
            </span>

            <span className="hover:text-white cursor-pointer">
              Terms & Conditions
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
