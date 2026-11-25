import { Link } from "react-router-dom";
import { useBookings } from "../data/BookingsContext";
import { useUsers } from "../data/UsersContext";

function MyBookings() {
  const { bookings, cancelBooking } = useBookings();
  const { currentUser } = useUsers();

  if (!currentUser) {
    return (
      <div className="container empty-state">
        <h2>Login to view your bookings</h2>

        <Link to="/login" className="btn-primary-custom">
          Login
        </Link>
      </div>
    );
  }

  const myBookings = bookings.filter(
    (booking) => booking.customerId === currentUser.id
  );

  return (
    <div className="container my-bookings-page">
      <h1>My Bookings</h1>
      <p>Manage and view your tickets.</p>

      {myBookings.length === 0 ? (
        <div className="empty-state">
          <h3>No bookings yet</h3>
          <p>Explore events and book your tickets.</p>

          <Link to="/events" className="btn-primary-custom">
            Explore Events
          </Link>
        </div>
      ) : (
        <div className="my-bookings-list">
          {myBookings.map((booking) => (
            <div className="my-booking-card" key={booking.id}>
              <img
                src={booking.eventImage}
                alt={booking.eventTitle}
              />

              <div className="my-booking-content">
                <h3>{booking.eventTitle}</h3>

                <p>{booking.eventLocation}</p>

                <p>
                  {new Date(
                    booking.eventDate + "T00:00:00"
                  ).toLocaleDateString()}
                </p>

                <p>
                  <strong>Seats:</strong> {booking.seats.join(", ")}
                </p>

                <p>
                  <strong>Booking ID:</strong> {booking.id}
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

                {booking.status === "Confirmed" && (
                  <button
                    className="btn-danger-custom"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to cancel this booking?"
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;