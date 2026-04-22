import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // 🔥 NEW
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      alert("All fields are required");
      return;
    }

    if (form.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true); 

      // Register
      await axios.post(
        "https://real-estate-z99v.onrender.com/api/auth/register",
        form
      );

      // Auto login
      const res = await axios.post(
        "https://real-estate-z99v.onrender.com/api/auth/login",
        {
          email: form.email,
          password: form.password
        }
      );

      localStorage.setItem("token", res.data.token);

      navigate("/");

    } catch (err) {
      console.error(err); 
      alert(err.response?.data?.msg || "Registration failed");
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark text-white">
      <div className="bg-card border border-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6 text-primary">
          Register
        </h1>

        <form onSubmit={handleRegister} className="space-y-4">

          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="w-full bg-black border border-gray-700 p-3 rounded-lg"
          />

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="w-full bg-black border border-gray-700 p-3 rounded-lg"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              className="w-full bg-black border border-gray-700 p-3 rounded-lg"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-sm text-gray-400"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* BUTTON WITH LOADER */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary py-3 rounded-lg font-semibold flex items-center justify-center"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Register & Login"
            )}
          </button>

        </form>

        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-primary">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;