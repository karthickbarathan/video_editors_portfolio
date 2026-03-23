import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/users/login", {
        email,
        password,
      });

      // ✅ store token
    //   localStorage.setItem("token", res.data.token);

    //   toast.success("Login successful 🚀");

    //   setTimeout(() => {
    //         navigate("/");
    // }, 500);
    //window.location.reload();

    login(res.data.token);
    toast.success("Login successful 🚀");
    navigate("/");

    } catch (err) {
      alert("Login Failed ❌");
      console.log(err);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-[#ffffff]" >

      <div className="bg-white/40 backdrop-blur-md p-8 rounded-xl w-96 border border-black shadow-lg">

        <h2 className="text-2xl text-black font-bold mb-6 text-center">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="
                    w-full px-3 py-2 
                    bg-white/60 
                    text-black 
                    placeholder-black/50 
                    border border-black 
                    rounded 
                    outline-none 
                    focus:ring-2 focus:ring-black
                    "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="
                    w-full px-3 py-2 
                    bg-white/60 
                    text-black 
                    placeholder-black/50 
                    border border-black 
                    rounded 
                    outline-none 
                    focus:ring-2 focus:ring-black
                    "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="
                    bg-black text-white 
                    px-4 py-2 
                    rounded-full 
                    font-semibold 
                    hover:opacity-80
                    transition
                    "
          >
            Login
          </button>

        </form>
      </div>

    </div>
  );
}

export default Login;