import { useState } from "react";
import { useEvents } from "../data/EventsContext";
import EventCard from "../components/EventCard";

function Events() {
  const { events } = useEvents();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    "Concert",
    "Sports",
    "Movies",
    "Comedy",
    "Workshop",
  ];

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.location.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || event.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container events-page">
      <div className="section-heading">
        <div>
          <h1>Explore Events</h1>
          <p>Find your next unforgettable experience.</p>
        </div>
      </div>

      <div className="event-filters">
        <input
          type="text"
          placeholder="Search events or locations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="empty-state">
          <h3>No events found</h3>
          <p>Try another search or category.</p>
        </div>
      ) : (
        <div className="events-grid">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Events;