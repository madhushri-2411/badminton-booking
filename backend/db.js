const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run(`CREATE TABLE bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    court TEXT,
    date TEXT,
    time TEXT
  )`);
});

module.exports = {
  getBookings: () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM bookings', [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  addBooking: (name, email, court, date, time) => {
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO bookings (name, email, court, date, time) VALUES (?, ?, ?, ?, ?)',
        [name, email, court, date, time],
        function (err) {
          if (err) reject(err);
          else resolve(this.lastID);
        });
    });
  },

  checkSlot: (date, time, court) => {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM bookings WHERE date = ? AND time = ? AND court = ?',
        [date, time, court],
        (err, row) => {
          if (err) reject(err);
          else resolve(row);
        });
    });
  }
};
