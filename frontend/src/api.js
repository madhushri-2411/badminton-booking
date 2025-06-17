const BASE_URL = "https://badminton-booking-qza0.onrender.com";

export async function getBookings() {
  const response = await fetch(`${BASE_URL}/bookings`);
  return response.json();
}

export async function createBooking(data) {
  const response = await fetch(`${BASE_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}
