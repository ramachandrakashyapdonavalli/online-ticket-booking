import { createContext, useContext, useState } from "react";
import { getBookings, saveBookings } from "./bookingStorage";

const BookingsContext = createContext(null);

export function BookingsProvider({ children }) {
  const [bookings, setBookings] = useState(getBookings);

  function addBooking(booking) {
    setBookings((previous) => {
      const updated = [booking, ...previous];
      saveBookings(updated);
      return updated;
    });
  }

  function cancelBooking(id) {
    setBookings((previous) => {
      const updated = previous.map((booking) =>
        booking.id === id
          ? { ...booking, status: "Cancelled" }
          : booking
      );

      saveBookings(updated);
      return updated;
    });
  }

  return (
    <BookingsContext.Provider
      value={{ bookings, addBooking, cancelBooking }}
    >
      {children}
    </BookingsContext.Provider>
  );
}

export function useBookings() {
  return useContext(BookingsContext);
}