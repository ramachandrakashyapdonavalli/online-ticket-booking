import { useParams, useNavigate } from "react-router-dom";
import { useEvents } from "../data/EventsContext";
import { useBookings } from "../data/BookingsContext";
import { useUsers } from "../data/UsersContext";
import { useState } from "react";

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { events } = useEvents();
  const { bookings } = useBookings();
  const { currentUser } = useUsers();

  const event = events.find((item) => item.id === id);

  const [selectedSeats, setSelectedSeats] = useState([]);

  if (!event) {
    return (
      <div className="container empty-state">
        <h2>Event not found</h2>
      </div>
    );
  }

  const rows = ["A", "B", "C", "D", "E", "F"];
  const columns = [1, 2, 3, 4, 5, 6, 7, 8];

  const bookedSeats = bookings
    .filter(
      (booking) =>
        booking.eventId === event.id &&
        booking.status !== "Cancelled"
    )
    .flatMap((booking) => booking.seats);

  function toggleSeat(seat) {
    if (bookedSeats.includes(seat)) return;

    setSelectedSeats((previous) =>
      previous.includes(seat)
        ? previous.filter((item) => item !== seat)
        : [...previous, seat]
    );
  }

  function continueToCheckout() {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }

    if (!currentUser) {
      navigate("/login", {
        state: { from: `/events/${event.id}` },
      });

      return;
    }

    navigate("/checkout", {
      state: {
        eventId: event.id,
        selectedSeats,
      },
    });
  }

  return (
    <div className="container event-details-page">
      <div className="event-details-layout">
        <div className="event-details-main">
          <img
            src={event.image}
            alt={event.title}
            className="event-details-image"
          />

          <span className="event-category">{event.category}</span>

          <h1>{event.title}</h1>

          <p>{event.description}</p>

          <div className="event-info-list">
            <p>
              <strong>Date:</strong>{" "}
              {new Date(event.date + "T00:00:00").toLocaleDateString()}
            </p>

            <p>
              <strong>Location:</strong> {event.location}
            </p>

            <p>
              <strong>Ticket Price:</strong> ₹{event.price}
            </p>
          </div>
        </div>

        <div className="seat-selection-card">
          <h2>Select Seats</h2>

          <div className="screen">STAGE / SCREEN</div>

          <div className="seat-grid">
            {rows.map((row) =>
              columns.map((column) => {
                const seat = `${row}${column}`;
                const isBooked = bookedSeats.includes(seat);
                const isSelected = selectedSeats.includes(seat);

                return (
                  <button
                    key={seat}
                    type="button"
                    className={`seat ${
                      isBooked
                        ? "seat-booked"
                        : isSelected
                          ? "seat-selected"
                          : "seat-available"
                    }`}
                    disabled={isBooked}
                    onClick={() => toggleSeat(seat)}
                    title={
                      isBooked
                        ? "Booked"
                        : isSelected
                          ? "Selected"
                          : "Available"
                    }
                  >
                    {seat}
                  </button>
                );
              })
            )}
          </div>

          <div className="seat-legend">
            <span>
              <i className="seat-legend-box available"></i> Available
            </span>
            <span>
              <i className="seat-legend-box selected"></i> Selected
            </span>
            <span>
              <i className="seat-legend-box booked"></i> Booked
            </span>
          </div>

          <div className="seat-summary">
            <p>Selected: {selectedSeats.join(", ") || "None"}</p>
            <p>Tickets: {selectedSeats.length}</p>
            <h3>Total: ₹{event.price * selectedSeats.length}</h3>
          </div>

          <button
            className="btn-primary-custom checkout-button"
            onClick={continueToCheckout}
          >
            Continue to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;