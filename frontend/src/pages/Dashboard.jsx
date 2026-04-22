import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Dashboard() {
  const [counts, setCounts] = useState({
    leads: 0,
    properties: 0,
  });

  const location = useLocation();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const leadsRes = await axios.get(
        "https://real-estate-z99v.onrender.com/api/leads",
        {
          headers: { Authorization: token }
        }
      );

      const propsRes = await axios.get(
        "https://real-estate-z99v.onrender.com/api/properties",
        {
          headers: { Authorization: token }
        }
      );

      setCounts({
        leads: leadsRes.data.length,
        properties: propsRes.data.length,
      });
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 Run when page loads + when route changes
  useEffect(() => {
    fetchData();
  }, [location]);

  return (
    <div className="text-white p-6">
      
      {/* Header */}
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Cards */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Leads Card */}
        <div className="bg-card border border-gray-800 p-6 rounded-2xl shadow hover:shadow-xl transition">
          <h2 className="text-gray-400 text-sm mb-2">Total Leads</h2>
          <p className="text-4xl font-bold text-primary">
            {counts.leads}
          </p>
        </div>

        {/* Properties Card */}
        <div className="bg-card border border-gray-800 p-6 rounded-2xl shadow hover:shadow-xl transition">
          <h2 className="text-gray-400 text-sm mb-2">Total Properties</h2>
          <p className="text-4xl font-bold text-primary">
            {counts.properties}
          </p>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;