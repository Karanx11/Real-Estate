import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("token");

  const linkStyle = (path) =>
    `px-4 py-2 rounded-lg transition ${
      pathname === path
        ? "bg-primary text-white"
        : "text-gray-400 hover:text-white"
    }`;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-card border-b border-gray-800 px-6 py-4 flex justify-between items-center">
      
      {/* Logo */}
      <h1 className="text-xl font-bold text-primary">
        RealEstate CRM
      </h1>

      {/* Links */}
      <div className="flex items-center gap-4">

        {isLoggedIn && (
          <>
            <Link to="/" className={linkStyle("/")}>Dashboard</Link>
            <Link to="/leads" className={linkStyle("/leads")}>Leads</Link>
            <Link to="/properties" className={linkStyle("/properties")}>Properties</Link>
          </>
        )}

        {/* Auth Buttons */}
        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              className="px-4 py-2 border border-gray-700 rounded-lg text-gray-300 hover:text-white"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-4 py-2 bg-primary rounded-lg text-white"
            >
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 rounded-lg text-white hover:opacity-80"
          >
            Logout
          </button>
        )}
      </div>

    </nav>
  );
}

export default Navbar;