import { useState } from "react";
import { toast } from "react-toastify";
import API from "../api/axios";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    projectType: "",
    budget: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/contacts", form);

      toast.success("Request sent successfully 🚀");

      setForm({
        name: "",
        email: "",
        message: "",
        projectType: "",
        budget: "",
      });

    } catch (err) {
      toast.error("Failed to send request ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="bg-white/30 backdrop-blur-md p-8 rounded-xl border border-black w-full max-w-md"
      >

        <h2 className="text-2xl text-orange-500 font-bold text-center">
          Contact Us
        </h2>

        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 rounded text-black"
          required
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 rounded text-black"
          required
        />

        <textarea
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
          className="w-full p-2 rounded text-black"
          required
        />

        <input
          name="projectType"
          placeholder="Project Type"
          value={form.projectType}
          onChange={handleChange}
          className="w-full p-2 rounded text-black"
        />

        <input
          name="budget"
          placeholder="Budget"
          value={form.budget}
          onChange={handleChange}
          className="w-full p-2 rounded text-black"
        />

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 py-2 rounded font-semibold"
        >
          Send Request
        </button>

      </form>

    </div>
  );
}

export default Contact;