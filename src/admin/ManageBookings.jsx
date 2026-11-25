import { useState } from "react";
import { useBookings } from "../data/BookingsContext";

function ManageBookings() {
  const { bookings, cancelBooking } = useBookings();
  const [search, setSearch] = useState("");

  const filteredBookings = bookings.filter((booking) =>
    [
      booking.id,
      booking.customerName,
      booking.email,
      booking.eventTitle,
    ].some((value) =>
      value?.toLowerCase().includes(search.toLowerCase())
    )
  );

  const confirmed = bookings.filter(
    (booking) => booking.status === "Confirmed"
  );

  const cancelled = bookings.filter(
    (booking) => booking.status === "Cancelled"
  );

  const revenue = confirmed.reduce(
    (total, booking) => total + booking.totalAmount,
    0
  );

  return (
    <div className="container admin-bookings-page">
      <div className="admin-page-header">
        <div>
          <h1>Manage Bookings</h1>
          <p>Monitor and manage customer bookings.</p>
        </div>
      </div>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <h3>{bookings.length}</h3>
          <p>Total Bookings</p>
        </div>

        <div className="admin-stat-card">
          <h3>{confirmed.length}</h3>
          <p>Confirmed</p>
        </div>

        <div className="admin-stat-card">
          <h3>{cancelled.length}</h3>
          <p>Cancelled</p>
        </div>

        <div className="admin-stat-card">
          <h3>₹{revenue.toLocaleString("en-IN")}</h3>
          <p>Demo Revenue</p>
        </div>
      </div>

      <div className="admin-section-card">
        <div className="admin-search-row">
          <h2>All Bookings</h2>

          <input
            type="search"
            placeholder="Search bookings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {filteredBookings.length === 0 ? (
          <div className="empty-state">
            <p>No bookings found.</p>
          </div>
        ) : (
          <div className="admin-booking-list">
            {filteredBookings.map((booking) => (
              <div className="admin-booking-card" key={booking.id}>
                <div>
                  <h3>{booking.eventTitle}</h3>
                  <p>
                    <strong>Booking ID:</strong> {booking.id}
                  </p>
                  <p>
                    <strong>Customer:</strong> {booking.customerName}
                  </p>
                  <p>
                    <strong>Email:</strong> {booking.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {booking.phone}
                  </p>
                  <p>
                    <strong>Seats:</strong> {booking.seats.join(", ")}
                  </p>
                  <p>
                    <strong>Date:</strong> {booking.bookingDate}
                  </p>
                  <p>
                    <strong>Amount:</strong> ₹{booking.totalAmount}
                  </p>

                  <span
                    className={`status-badge ${
                      booking.status === "Confirmed"
                        ? "status-confirmed"
                        : "status-cancelled"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>

                {booking.status === "Confirmed" && (
                  <button
                    className="btn-danger-custom"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Cancel this booking?"
                        )
                      ) {
                        cancelBooking(booking.id);
                      }
                    }}
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageBookings;