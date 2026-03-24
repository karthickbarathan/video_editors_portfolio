import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axios";

function Navbar() {
  const [query, setQuery] = useState("");
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  

  useEffect(() => {
  const fetchUser = async () => {
    try {
      if (!token) {
        setRole(null);
        return;
      }

      const res = await API.get("/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRole(res.data.role);
    } catch (err) {
      console.log("USER FETCH ERROR:", err);
      setRole(null);
    }
  };

  fetchUser();
}, [token]);
 

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${query}`);
  };

  console.log("TOKEN:", token);
  console.log("ROLE:", role);

  return (
    <div className="sticky top-0 z-50
        bg-gradient-to-r from-white/10 via-white/5 to-white/10
        backdrop-blur-2xl
        border-b border-white/20
        shadow-[0_8px_30px_rgb(0,0,0,0.25)]
        flex justify-between items-center p-4 ">

      {/* LOGO */}
      <h1 className="text-black text-xl font-bold">
        MRK Studio
      </h1>

      {/* SEARCH */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search videos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className=" px-4 py-2
                bg-white/60
                text-black
                placeholder-black/60
                border border-black
                rounded-full
                outline-none
                focus:ring-2 focus:ring-black
                w-64"
        />
      </form>

      {/* NAV LINKS */}
      <div className="space-x-4 flex items-center">

        <Link to="/" className="text-black font-medium hover:opacity-70">
          Home
        </Link>

        {/* ADMIN ONLY */}
        {role === "ADMIN" && (
          <button
            onClick={() => navigate("/admin")}
            className="text-red-400"
          >
            Admin
          </button>
        )}

        

        {/* LOGIN / LOGOUT */}
        {!token ? (
          <Link to="/login" className="text-black font-medium hover:opacity-70">
            Login
          </Link>
        ) : (
          <button
            onClick={() => {
              logout();
              toast.success("Logged out 👋");
              navigate("/login");
            }}
            className="text-red-400"
          >
            Logout
          </button>
        )}

        <Link to="/contact" className="text-black font-medium hover:opacity-70">
          Contact
        </Link>

      </div>
    </div>
  );
}

export default Navbar;