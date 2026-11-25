import { Link } from "react-router-dom";
import { useEvents } from "../data/EventsContext";
import EventCard from "../components/EventCard";

function Home() {
  const { events } = useEvents();

  const featuredEvents = events.slice(0, 3);

  return (
    <>
      <section className="hero-section">
        <div className="container hero-content">
          <span className="hero-tag">YOUR NEXT EXPERIENCE STARTS HERE</span>

          <h1>
            Discover Events.
            <br />
            <span>Book Your Moments.</span>
          </h1>

          <p>
            Find concerts, sports, movies, workshops and experiences
            you love.
          </p>

          <Link to="/events" className="btn-primary-custom hero-button">
            Explore Events
          </Link>
        </div>
      </section>

      <section className="container home-featured">
        <div className="section-heading">
          <div>
            <h2>Featured Events</h2>
            <p>Discover upcoming experiences</p>
          </div>

          <Link to="/events">View All Events →</Link>
        </div>

        <div className="events-grid">
          {featuredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;