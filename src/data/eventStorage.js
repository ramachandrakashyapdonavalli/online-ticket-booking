import initialEvents from "./events";

const EVENT_KEY = "evently_events";

export function getEvents() {
  const storedEvents = localStorage.getItem(EVENT_KEY);

  if (storedEvents) {
    return JSON.parse(storedEvents);
  }

  localStorage.setItem(EVENT_KEY, JSON.stringify(initialEvents));
  return initialEvents;
}

export function saveEvents(events) {
  localStorage.setItem(EVENT_KEY, JSON.stringify(events));
}