import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import './App.css'
import VideoPlayer from "./pages/VideoPlayer";
import Home from "./pages/Home";
import Navbar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from './pages/Login';
import AdminDashboard from "./pages/AdminDashboard";
import Contact from "./pages/Contact";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";


function App() {

  return (
    <AuthProvider>
    {/* <div className="min-h-screen bg-[#FFFFFF] text-black font-semibold"> */}
    <div className="animated-bg">
      <Navbar />
      <div className="pt-16">
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/videos/:id" element={<VideoPlayer />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
            }
        />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="dark"
      />
      </div>
      
    </div>
    </AuthProvider>
  )
}

export default App
