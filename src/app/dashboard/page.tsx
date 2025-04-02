"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8000");

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    closedOrders: 0,
    canceledOrders: 0,
  });

  // Fetch daily stats
  const fetchStats = async () => {
    try {
      const response = await fetch("http://localhost:8000/daily-stats");
      const data = await response.json();
      if (data.success) {
        setStats(data);
      }
      console.log("Fetched stats:", data);
    } catch (error) {
      console.error("Failed to fetch order stats:", error);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 20000);

    // Listen for order updates
    socket.on("new_order", fetchStats);
    socket.on("order_updated", fetchStats);

    return () => {
      clearInterval(interval);
      socket.off("new_order");
      socket.off("order_updated");
    };
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-gray-200 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total Orders</h2>
          <p className="text-2xl">{stats.totalOrders}</p>
        </div>
        <div className="bg-yellow-200 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Pending Orders</h2>
          <p className="text-2xl">{stats.pendingOrders}</p>
        </div>
        <div className="bg-green-200 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Completed Orders</h2>
          <p className="text-2xl">{stats.closedOrders}</p>
        </div>
        <div className="bg-red-200 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Canceled Orders</h2>
          <p className="text-2xl">{stats.canceledOrders}</p>
        </div>
      </div>
    </div>
  );
}
