import "./App.css";
import { useState, useEffect } from "react";

const mockData = [
  { name: "We became 'us'", date: "2024-11-09" },
  { name: "Love just became a feeling", date: "2024-11-18" },
];

function App() {
  const [events, setEvents] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Load events
    setEvents(mockData);

    // Update current time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // Cleanup on component unmount
  }, []);

  const parseDateInIST = (dateString) => {
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(Date.UTC(year, month - 1, day)); // Create a UTC date
    // Convert to IST (UTC+5:30)
    date.setHours(date.getHours() + 5);
    date.setMinutes(date.getMinutes() + 30);
    return date;
  };

  const calculateElapsedTime = (eventDate) => {
    const eventTime = parseDateInIST(eventDate);
    const elapsedMs = currentTime - eventTime; // Time elapsed in milliseconds

    if (elapsedMs < 0) {
      return null; // Skip future events
    }

    const days = Math.floor(elapsedMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((elapsedMs / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((elapsedMs / (1000 * 60)) % 60);
    const seconds = Math.floor((elapsedMs / 1000) % 60);
    return { days, hours, minutes, seconds };
  };

  return (
    <div className="mainContainer">
      <h1>The Journey of a lifetime...</h1>
      <p className="long-text">
        Every second of this has been memorable, however I would love to track
        some momentous occasions in our relationship! Here are some:
      </p>
      {events.map((event, index) => {
        const { name, date } = event;
        const { days, hours, minutes, seconds } = calculateElapsedTime(date);
        return (
          <div className="event-card" key={index}>
            <h2 className="event-name">{name}</h2>
            <p className="time-since">Time since: </p>
            <div>
              <span className="time-block"> {days} D </span>
              <span className="time-block"> {hours} H </span>
              <span className="time-block"> {minutes} M </span>
              <span className="time-block"> {seconds} S</span>
            </div>
          </div>
        );
      })}
      <p className="end-text">... Insha Allah many more to come ❤️</p>
    </div>
  );
}

export default App;
