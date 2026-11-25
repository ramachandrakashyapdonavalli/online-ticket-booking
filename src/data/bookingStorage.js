const BOOKING_KEY = "evently_bookings";

export function getBookings() {
  const storedBookings = localStorage.getItem(BOOKING_KEY);

  return storedBookings ? JSON.parse(storedBookings) : [];
}

export function saveBookings(bookings) {
  localStorage.setItem(BOOKING_KEY, JSON.stringify(bookings));
}