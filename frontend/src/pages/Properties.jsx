import { useEffect, useState } from "react";
import axios from "axios";

function Properties() {
  const [properties, setProperties] = useState([]);
  const [form, setForm] = useState({
    title: "",
    location: "",
    price: "",
    size: ""
  });

  // 🔹 Fetch properties (user-specific)
  const fetchProperties = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://real-estate-z99v.onrender.com/api/properties",
        {
          headers: { Authorization: token }
        }
      );

      setProperties(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // 🔹 Add property
  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation
    if (!form.title || !form.location || !form.price || !form.size) {
      alert("All fields are required");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "https://real-estate-z99v.onrender.com/api/properties",
        form,
        {
          headers: { Authorization: token }
        }
      );

      setForm({ title: "", location: "", price: "", size: "" });
      fetchProperties();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="text-white p-6">

      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">Properties</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-card border border-gray-800 p-5 rounded-2xl shadow mb-8"
      >
        <div className="grid md:grid-cols-2 gap-4">

          <input
            className="bg-black border border-gray-700 p-2 rounded focus:outline-none focus:border-primary"
            placeholder="Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <input
            className="bg-black border border-gray-700 p-2 rounded focus:outline-none focus:border-primary"
            placeholder="Location"
            value={form.location}
            onChange={(e) =>
              setForm({ ...form, location: e.target.value })
            }
          />

          <input
            type="number"
            className="bg-black border border-gray-700 p-2 rounded focus:outline-none focus:border-primary"
            placeholder="Price"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
          />

          <input
            className="bg-black border border-gray-700 p-2 rounded focus:outline-none focus:border-primary"
            placeholder="Size"
            value={form.size}
            onChange={(e) =>
              setForm({ ...form, size: e.target.value })
            }
          />
        </div>

        <button
          type="submit"
          className="mt-5 bg-primary px-5 py-2 rounded-lg text-white font-medium hover:opacity-80 transition"
        >
          Add Property
        </button>
      </form>

      {/* Properties List */}
      {properties.length === 0 ? (
        <p className="text-gray-400">No properties found</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {properties.map((p) => (
            <div
              key={p._id}
              className="bg-card border border-gray-800 p-4 rounded-2xl shadow hover:border-primary transition"
            >
              <h2 className="text-lg font-semibold">{p.title}</h2>

              <p className="text-gray-400 text-sm mt-1">
                📍 {p.location}
              </p>

              <div className="mt-3 flex justify-between items-center">
                <span className="text-primary font-bold text-lg">
                  ₹{p.price}
                </span>

                <span className="text-xs border border-gray-700 px-2 py-1 rounded">
                  {p.size}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Properties;