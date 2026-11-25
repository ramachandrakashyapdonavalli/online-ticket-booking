import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEvents } from "../data/EventsContext";
import { useBookings } from "../data/BookingsContext";
import { useUsers } from "../data/UsersContext";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  const { events } = useEvents();
  const { addBooking, bookings } = useBookings();
  const { currentUser, addOrUpdateUser } = useUsers();

  const eventId = location.state?.eventId;
  const selectedSeats = location.state?.selectedSeats || [];

  const event = events.find((item) => item.id === eventId);

  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [phone, setPhone] = useState(currentUser?.phone || "");
  const [processing, setProcessing] = useState(false);

  if (!currentUser) {
    return (
      <div className="container empty-state">
        <h2>Login required</h2>
        <p>Please login before completing your booking.</p>
        <button
          className="btn-primary-custom"
          onClick={() =>
            navigate("/login", {
              state: { from: "/events" },
            })
          }
        >
          Login
        </button>
      </div>
    );
  }

  if (!event || selectedSeats.length === 0) {
    return (
      <div className="container empty-state">
        <h2>Booking details unavailable</h2>
        <p>Please select an event and seats first.</p>
        <button
          className="btn-primary-custom"
          onClick={() => navigate("/events")}
        >
          Browse Events
        </button>
      </div>
    );
  }

  const totalAmount = event.price * selectedSeats.length;

  function handlePayment(e) {
    e.preventDefault();

    if (processing) return;

    // Re-check seats before confirming the demo booking.
    const occupiedSeats = bookings
      .filter(
        (booking) =>
          booking.eventId === event.id &&
          booking.status !== "Cancelled"
      )
      .flatMap((booking) => booking.seats);

    const conflict = selectedSeats.some((seat) =>
      occupiedSeats.includes(seat)
    );

    if (conflict) {
      alert("One or more selected seats are already booked.");
      navigate(`/events/${event.id}`);
      return;
    }

    setProcessing(true);

    // Simulated payment processing.
    setTimeout(() => {
      const booking = {
        id: `BK-${Date.now()}`,
        eventId: event.id,
        eventTitle: event.title,
        eventImage: event.image,
        eventDate: event.date,
        eventLocation: event.location,
        customerId: currentUser.id,
        customerName: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        seats: selectedSeats,
        totalAmount,
        bookingDate: new Date().toLocaleString(),
        status: "Confirmed",
      };

      addBooking(booking);

      addOrUpdateUser({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
      });

      navigate("/confirmation", {
        state: { booking },
      });
    }, 1200);
  }

  return (
    <div className="container checkout-page">
      <div className="checkout-layout">
        <div className="checkout-form-card">
          <h1>Checkout</h1>
          <p>Confirm your details before completing your booking.</p>

          <form onSubmit={handlePayment}>
            <div className="form-group">
              <label>Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn-primary-custom checkout-button"
              disabled={processing}
            >
              {processing
                ? "Processing..."
                : `Pay ₹${totalAmount}`}
            </button>
          </form>

          <p className="payment-demo-notice">
            Demo payment only. No real payment is processed.
          </p>
        </div>

        <div className="checkout-summary-card">
          <h2>Order Summary</h2>

          <img src={event.image} alt={event.title} />

          <h3>{event.title}</h3>

          <p>{event.location}</p>

          <p>
            {new Date(event.date + "T00:00:00").toLocaleDateString()}
          </p>

          <p>
            <strong>Seats:</strong> {selectedSeats.join(", ")}
          </p>

          <p>
            <strong>Tickets:</strong> {selectedSeats.length}
          </p>

          <hr />

          <div className="checkout-total">
            <span>Total</span>
            <strong>₹{totalAmount}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;