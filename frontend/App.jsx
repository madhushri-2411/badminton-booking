import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = 'https://YOUR-BACKEND-URL.onrender.com'; // update when deployed

function App() {
  const [date, setDate] = useState('');
  const [availability, setAvailability] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', court: '', time: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (date) {
      axios.get(`${API_BASE}/availability?date=${date}`).then(res => {
        setAvailability(res.data);
        setSelectedSlot(null);
      });
    }
  }, [date]);

  const handleBooking = async () => {
    if (!form.name || !form.email || !form.court || !form.time || !date) {
      setMessage('Please fill all fields');
      return;
    }
    try {
      const res = await axios.post(`${API_BASE}/book`, {
        ...form,
        date,
      });
      setMessage('Booking successful!');
      setForm({ name: '', email: '', court: '', time: '' });
      setSelectedSlot(null);
      setDate('');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Error booking court');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 font-sans">
      <h1 className="text-2xl font-bold mb-4 text-center">Indian Association Hall - Court Booking</h1>

      <label className="block mb-2 font-semibold">Select Date</label>
      <input type="date" className="border p-2 mb-4 w-full" value={date} onChange={e => setDate(e.target.value)} />

      {availability.length > 0 && (
        <div>
          <h2 className="font-semibold mb-2">Available Slots:</h2>
          {availability.map(slot => (
            <div key={slot.time} className="mb-2">
              <strong>{slot.time}</strong>:
              {slot.availableCourts.length > 0 ? (
                slot.availableCourts.map(court => (
                  <button
                    key={court}
                    className={`ml-2 px-3 py-1 border rounded ${selectedSlot?.time === slot.time && selectedSlot?.court === court ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                    onClick={() => {
                      setSelectedSlot({ court, time: slot.time });
                      setForm({ ...form, court, time: slot.time });
                    }}
                  >
                    {court}
                  </button>
                ))
              ) : (
                <span className="text-red-500 ml-2">Fully booked</span>
              )}
            </div>
          ))}
        </div>
      )}

      {selectedSlot && (
        <div className="mt-4">
          <label className="block mb-1">Your Name</label>
          <input type="text" className="border p-2 w-full mb-2" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />

          <label className="block mb-1">Your Email</label>
          <input type="email" className="border p-2 w-full mb-2" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />

          <button onClick={handleBooking} className="bg-green-600 text-white px-4 py-2 rounded mt-2">Confirm Booking</button>
        </div>
      )}

      {message && <div className="mt-4 text-blue-700 font-semibold">{message}</div>}
    </div>
  );
}

export default App;
