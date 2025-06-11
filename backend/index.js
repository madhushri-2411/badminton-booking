const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Get all bookings
app.get('/bookings', async (req, res) => {
  const bookings = await db.getBookings();
  res.json(bookings);
});

// Create a new booking
app.post('/bookings', async (req, res) => {
  const { name, email, court, date, time } = req.body;
  const exists = await db.checkSlot(date, time, court);
  if (exists) {
    return res.status(409).json({ message: 'Slot already booked' });
  }
  await db.addBooking(name, email, court, date, time);
  res.status(201).json({ message: 'Booking confirmed' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
