import { Link, useLocation } from "react-router-dom";
import { CheckCircle } from "lucide-react";

function Confirmation() {
  const location = useLocation();
  const booking = location.state?.booking;

  if (!booking) {
    return (
      <div className="container empty-state">
        <h2>Booking confirmation unavailable</h2>
        <Link to="/bookings" className="btn-primary-custom">
          View My Bookings
        </Link>
      </div>
    );
  }

  return (
    <div className="container confirmation-page">
      <div className="ticket-card">
        <div className="confirmation-header">
          <CheckCircle size={60} />
          <h1>Booking Confirmed!</h1>
          <p>Your demo ticket has been created.</p>
        </div>

        <div className="ticket-content">
          <img src={booking.eventImage} alt={booking.eventTitle} />

          <h2>{booking.eventTitle}</h2>

          <div className="ticket-details">
            <div>
              <span>Booking ID</span>
              <strong>{booking.id}</strong>
            </div>

            <div>
              <span>Customer</span>
              <strong>{booking.customerName}</strong>
            </div>

            <div>
              <span>Email</span>
              <strong>{booking.email}</strong>
            </div>

            <div>
              <span>Event Date</span>
              <strong>
                {new Date(
                  booking.eventDate + "T00:00:00"
                ).toLocaleDateString()}
              </strong>
            </div>

            <div>
              <span>Location</span>
              <strong>{booking.eventLocation}</strong>
            </div>

            <div>
              <span>Seats</span>
              <strong>{booking.seats.join(", ")}</strong>
            </div>

            <div>
              <span>Amount</span>
              <strong>₹{booking.totalAmount}</strong>
            </div>

            <div>
              <span>Status</span>
              <strong>{booking.status}</strong>
            </div>
          </div>
        </div>

        <div className="ticket-actions">
          <Link to="/bookings" className="btn-primary-custom">
            My Bookings
          </Link>

          <Link to="/events" className="btn-secondary-custom">
            Explore Events
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;