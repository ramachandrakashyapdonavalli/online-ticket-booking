import { createContext, useContext, useState } from "react";
import { getEvents, saveEvents } from "./eventStorage";

const EventsContext = createContext(null);

export function EventsProvider({ children }) {
  const [events, setEvents] = useState(getEvents);

  function updateEvents(updatedEvents) {
    setEvents(updatedEvents);
    saveEvents(updatedEvents);
  }

  return (
    <EventsContext.Provider value={{ events, updateEvents }}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  return useContext(EventsContext);
}