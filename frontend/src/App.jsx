import { useEffect, useState } from "react";
import { createBooking, getBookings } from "./api";

export default function App() {
  const [bookings, setBookings] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    court: "Court 1",
    date: "",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    async function loadBookings() {
      try {
        const data = await getBookings();
        setBookings(data);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
    }
    loadBookings();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.endTime <= formData.startTime) {
      alert("End time must be after start time.");
      return;
    }

    const conflict = bookings.some(
      (b) =>
        b.court === formData.court &&
        b.date === formData.date &&
        b.startTime === formData.startTime &&
        b.endTime === formData.endTime
    );

    if (conflict) {
      alert("This time slot is already booked for this court.");
      return;
    }

    try {
      const newBooking = await createBooking(formData);
      setBookings((prev) => [...prev, newBooking]);
      alert("Booking successful!");
      setFormData({
        name: "",
        email: "",
        court: "Court 1",
        date: "",
        startTime: "",
        endTime: "",
      });
    } catch (error) {
      console.error("Failed to create booking:", error);
      alert("Booking failed. Please try again later.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Badminton Court Booking</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="court"
          value={formData.court}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option>Court 1</option>
          <option>Court 2</option>
          <option>Court 3</option>
        </select>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="time"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="time"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Book Now
        </button>
      </form>

      <h2 className="text-xl font-semibold mt-8">Current Bookings</h2>
      <ul className="mt-4 space-y-2">
        {bookings.map((b, i) => (
          <li
            key={i}
            className="border p-2 rounded shadow-sm bg-gray-50"
          >
            <strong>{b.name}</strong> booked <strong>{b.court}</strong> on{' '}
            <strong>{b.date}</strong> from <strong>{b.startTime}</strong> to{' '}
            <strong>{b.endTime}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
