const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const db = new sqlite3.Database('./booking.db');

app.use(cors());
app.use(bodyParser.json());

// Initialize database
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    court TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL
  )`);
});

const COURTS = ['Court 1', 'Court 2', 'Court 3'];
const TIME_SLOTS = [
  '14:00', '15:00', '16:00', '17:00', '18:00',
  '19:00', '20:00', '21:00', '22:00'
];

// Get available courts
app.get('/availability', (req, res) => {
  const { date } = req.query;
  if (!date) return res.status(400).json({ error: 'Missing date' });

  db.all(`SELECT court, time FROM bookings WHERE date = ?`, [date], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    const bookedMap = {};
    rows.forEach(({ court, time }) => {
      if (!bookedMap[time]) bookedMap[time] = new Set();
      bookedMap[time].add(court);
    });

    const availability = TIME_SLOTS.map(time => {
      const bookedCourts = bookedMap[time] || new Set();
      const availableCourts = COURTS.filter(court => !bookedCourts.has(court));
      return { time, availableCourts };
    });

    res.json(availability);
  });
});

// Book a court
app.post('/book', (req, res) => {
  const { name, email, court, date, time } = req.body;

  if (!name || !email || !court || !date || !time) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  db.get(`SELECT * FROM bookings WHERE court = ? AND date = ? AND time = ?`, [court, date, time], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (row) return res.status(400).json({ error: 'Court already booked at that time' });

    db.run(`INSERT INTO bookings (name, email, court, date, time) VALUES (?, ?, ?, ?, ?)`,
      [name, email, court, date, time],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, bookingId: this.lastID });
      }
    );
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
