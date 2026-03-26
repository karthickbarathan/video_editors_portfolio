import { useState } from "react";
import { toast } from "react-toastify";
import API from "../api/axios";

import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";

import { motion } from "framer-motion";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    projectType: "",
    budget: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.post("/contacts", form);

      toast.success(
        "Request sent successfully - Our team will contact you shortly",
      );

      setForm({
        name: "",
        email: "",
        message: "",
        projectType: "",
        budget: "",
      });
    } catch (err) {
      toast.error("Failed to send request ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="max-w-md w-full p-8 space-y-4">
            <h2 className="text-2xl font-bold text-center">Contact Us</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
              />

              <Input
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
              />

              <textarea
                name="message"
                placeholder="Message"
                value={form.message}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-black rounded-lg outline-none focus:ring-2 focus:ring-black"
              />

              <Input
                name="projectType"
                placeholder="Project Type (Optional)"
                value={form.projectType}
                onChange={handleChange}
              />

              <Input
                name="budget"
                placeholder="Budget (Optional)"
                value={form.budget}
                onChange={handleChange}
              />

              <Button className="w-full" disabled={loading}>
                {loading ? "Sending..." : "Send Request"}
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    </Container>
  );
}

export default Contact;
