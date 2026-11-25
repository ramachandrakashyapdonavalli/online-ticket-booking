import { Link } from "react-router-dom";

function EventCard({ event }) {
  return (
    <div className="event-card">
      <img src={event.image} alt={event.title} />

      <div className="event-card-content">
        <span className="event-category">{event.category}</span>

        <h3>{event.title}</h3>

        <p>{event.location}</p>
        <p>{new Date(event.date + "T00:00:00").toLocaleDateString()}</p>

        <div className="event-card-bottom">
          <strong>₹{event.price}</strong>

          <Link to={`/events/${event.id}`} className="btn-primary-custom">
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EventCard;