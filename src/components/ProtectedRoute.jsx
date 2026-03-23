import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import API from "../api/axios";

function ProtectedRoute({ children }) {
  const [status, setStatus] = useState("loading"); 
  // loading | allowed | denied

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await API.get("/users/me");

        if (res.data?.role === "ADMIN") {
          setStatus("allowed");
        } else {
          setStatus("denied");
        }

      } catch (err) {
        console.log("Auth failed:", err.response?.status);

        // 🔥 IMPORTANT: ANY ERROR = DENIED
        setStatus("denied");
      }
    };

    checkAuth();
  }, []);

  if (status === "loading") {
    return <div className="text-white p-6">Checking access...</div>;
  }

  if (status === "denied") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;