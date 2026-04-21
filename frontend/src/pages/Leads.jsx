import { useEffect, useState } from "react";
import axios from "axios";

function Leads() {
  const [leads, setLeads] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    budget: "",
    preferences: ""
  });

  // 🔹 Fetch leads (user-specific)
  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/leads",
        {
          headers: { Authorization: token }
        }
      );

      setLeads(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // 🔹 Add lead
  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation
    if (!form.name || !form.phone || !form.email) {
      alert("Name, Phone and Email are required");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/leads",
        form,
        {
          headers: { Authorization: token }
        }
      );

      setForm({
        name: "",
        phone: "",
        email: "",
        budget: "",
        preferences: ""
      });

      fetchLeads();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Leads</h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-card p-5 rounded-xl shadow-lg border border-gray-800 mb-8"
      >
        <div className="grid md:grid-cols-2 gap-4">

          <input
            className="bg-black border border-gray-700 p-2 rounded focus:outline-none focus:border-primary"
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            className="bg-black border border-gray-700 p-2 rounded focus:outline-none focus:border-primary"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
          />

          <input
            className="bg-black border border-gray-700 p-2 rounded focus:outline-none focus:border-primary"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="number"
            className="bg-black border border-gray-700 p-2 rounded focus:outline-none focus:border-primary"
            placeholder="Budget"
            value={form.budget}
            onChange={(e) =>
              setForm({ ...form, budget: e.target.value })
            }
          />

          <input
            className="bg-black border border-gray-700 p-2 rounded md:col-span-2 focus:outline-none focus:border-primary"
            placeholder="Preferences"
            value={form.preferences}
            onChange={(e) =>
              setForm({ ...form, preferences: e.target.value })
            }
          />
        </div>

        <button
          type="submit"
          className="mt-5 bg-primary px-5 py-2 rounded-lg text-white font-medium hover:opacity-80 transition"
        >
          Add Lead
        </button>
      </form>

      {/* LIST */}
      {leads.length === 0 ? (
        <p className="text-gray-400">No leads found</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {leads.map((lead) => (
            <div
              key={lead._id}
              className="bg-card p-4 rounded-xl shadow border border-gray-800 hover:border-primary transition"
            >
              <h2 className="font-semibold text-lg">{lead.name}</h2>

              <p className="text-gray-400 text-sm">{lead.email}</p>
              <p className="text-gray-400 text-sm">{lead.phone}</p>

              <div className="mt-2 flex justify-between items-center">
                <span className="text-primary font-semibold">
                  ₹{lead.budget}
                </span>

                <span className="text-xs bg-black px-2 py-1 rounded border border-gray-700">
                  {lead.status}
                </span>
              </div>

              <p className="text-gray-500 text-sm mt-2">
                {lead.preferences}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Leads;