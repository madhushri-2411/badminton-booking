import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    court: 1,
    date: "",
    startTime: 14,
    endTime: 15,
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.endTime <= formData.startTime) {
      setStatus("End time must be after start time.");
      return;
    }
    try {
      const response = await axios.post("https://badminton-booking-qza0.onrender.com/book", formData);
      setStatus(response.data.message || "Booking successful!");
    } catch (error) {
      setStatus(error.response?.data?.error || "Booking failed.");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Badminton Court Booking</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full border p-2" name="name" placeholder="Your Name" onChange={handleChange} required />
        <input className="w-full border p-2" name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input className="w-full border p-2" name="date" type="date" onChange={handleChange} required />
        <select className="w-full border p-2" name="court" onChange={handleChange}>
          <option value="1">Court 1</option>
          <option value="2">Court 2</option>
          <option value="3">Court 3</option>
        </select>
        <select className="w-full border p-2" name="startTime" onChange={handleChange}>
          {[...Array(10)].map((_, i) => {
            const hour = i + 14;
            return <option key={hour} value={hour}>{hour}:00</option>;
          })}
        </select>
        <select className="w-full border p-2" name="endTime" onChange={handleChange}>
          {[...Array(10)].map((_, i) => {
            const hour = i + 15;
            return <option key={hour} value={hour}>{hour}:00</option>;
          })}
        </select>
        <button className="bg-blue-500 text-white p-2 rounded" type="submit">Book</button>
        {status && <p className="mt-2 text-sm">{status}</p>}
      </form>
    </div>
  );
};

export default App;
