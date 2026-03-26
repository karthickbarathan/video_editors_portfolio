import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import API from '../api/axios';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

function Navbar() {
  const [query, setQuery] = useState('');
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

        const res = await API.get('/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setRole(res.data.role);
      } catch (err) {
        console.log('USER FETCH ERROR:', err);
        setRole(null);
      }
    };

    fetchUser();
  }, [token]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${query}`);
  };

  console.log('TOKEN:', token);
  console.log('ROLE:', role);

  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 z-50 w-full border-b border-white/20 bg-white/10 backdrop-blur-md"
    >
      <div className="flex items-center justify-between px-6 py-3">
        {/* LEFT - LOGO */}
        <h1 className="text-xl font-bold text-gray-100">MR K Studio</h1>

        {/* CENTER - SEARCH */}
        <form onSubmit={handleSearch} className="hidden md:block">
          <Input
            type="text"
            placeholder="Search videos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-64 rounded-full border border-black bg-white/60 px-4 py-2 text-black placeholder-black/60 outline-none focus:ring-2 focus:ring-black"
          />
        </form>

        {/* RIGHT - NAV LINKS */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="font-medium text-yellow-200 hover:opacity-70">
            Home
          </Link>

          {role === 'ADMIN' && (
            <Button onClick={() => navigate('/admin')} className="text-red-400">
              Admin
            </Button>
          )}

          {!token ? (
            <Link
              to="/login"
              className="font-medium text-orange-300 hover:opacity-70"
            >
              Login
            </Link>
          ) : (
            <Button
              variant="danger"
              onClick={() => {
                logout();
                toast.success('Logged out 👋');
                navigate('/login');
              }}
              className="text-red-400"
            >
              Logout
            </Button>
          )}

          <Link
            to="/contact"
            className="font-medium text-yellow-200 hover:opacity-70"
          >
            Contact
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default Navbar;
