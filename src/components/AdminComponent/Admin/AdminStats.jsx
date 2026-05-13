import axios from "axios";
import { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function AdminOverview() {
  const [stats, setStats] = useState({});

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:3100/api/admin/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setStats(response.data.stats);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // chart data
  const chartData = [
    {
      name: "Doctors",
      total: stats.totalDoctors || 0,
    },

    {
      name: "Patients",
      total: stats.totalPatients || 0,
    },

    {
      name: "Appointments",
      total: stats.totalAppointments || 0,
    },

    {
      name: "Booked",
      total: stats.bookedAppointments || 0,
    },

    {
      name: "Completed",
      total: stats.completedAppointments || 0,
    },

    {
      name: "Cancelled",
      total: stats.cancelledAppointments || 0,
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Chart */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-6">Hospital Statistics</h2>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="total" fill="#2563eb" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
