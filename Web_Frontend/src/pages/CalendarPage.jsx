import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Paper, Button, Typography } from "@mui/material";
import xlogo from "../Logo/x.png";
import skybluelogo from "../Logo/bluesky.png";
import tumblrlogo from "../Logo/tumblr.png";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const platformLogos = {
  x: xlogo,
  tumblr: tumblrlogo,
  bluesky: skybluelogo,
};

// Updated events data with current year
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();

const EventComponent = ({ event }) => {
  return (
    <Paper
      elevation={1}
      sx={{
        p: 1,
        fontSize: "0.875rem",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
        "& > *": { pointerEvents: "none" },
      }}
    >
      <p
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          margin: 0,
        }}
      >
        {event.title}
      </p>
      <div
        style={{
          marginTop: "0.25rem",
          display: "flex",
          gap: "0.25rem",
        }}
      >
        {event.platforms.map((platform) => (
          <div
            key={platform.name}
            style={{
              height: "16px",
              width: "16px",
              borderRadius: "4px",
              backgroundColor: "#e5e7eb",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            title={platform.name}
          >
            <img
              src={platform.logo}
              alt={platform.name}
              style={{ height: "12px", width: "12px" }}
            />
          </div>
        ))}
      </div>
    </Paper>
  );
};

export const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [allEvents, setAllEvents] = useState([
    {
      id: 1,
      title: "Launch your own SaaS and start generating revenue.",
      start: new Date(currentYear, currentMonth, 3),
      end: new Date(currentYear, currentMonth, 3),
      platforms: [
        { name: "x", logo: xlogo },
        { name: "tumblr", logo: tumblrlogo },
        { name: "bluesky", logo: skybluelogo },
      ],
      image: "https://via.placeholder.com/150", // Placeholder image for this event
      description:
        "This event discusses strategies for launching your own SaaS product and the steps to start generating revenue immediately.", // Event description
    },
    {
      id: 2,
      title: "I assume that every giant company has a product for...",
      start: new Date(currentYear, currentMonth, 6),
      end: new Date(currentYear, currentMonth, 6),
      platforms: [
        { name: "x", logo: xlogo },
        { name: "tumblr", logo: tumblrlogo },
        { name: "bluesky", logo: skybluelogo },
      ],
      image: "https://via.placeholder.com/150", // Placeholder image for this event
      description:
        "A deep dive into how large companies ensure they have products for every segment of the market and what strategies they employ.", // Event description
    },
  ]);

  const handleDateClick = (slotInfo) => {
    setSelectedDate(slotInfo.start);

    // Check if there is an event scheduled on that day
    const eventForSelectedDate = allEvents.find(
      (event) => event.start.toDateString() === slotInfo.start.toDateString()
    );

    if (eventForSelectedDate) {
      setSelectedEvent(eventForSelectedDate);
    } else {
      setSelectedEvent(null);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <div style={{ height: "calc(100vh - 8rem)" }}>
        <Calendar
          localizer={localizer}
          events={allEvents}
          startAccessor="start"
          endAccessor="end"
          components={{
            event: EventComponent,
          }}
          views={["month"]}
          date={date}
          onNavigate={(newDate) => setDate(newDate)}
          onSelectSlot={handleDateClick}
          selectable={true}
          style={{ height: "100%" }}
          className="bg-white"
        />
      </div>
      {selectedEvent && (
        <Paper sx={{ p: 2, mt: 2 }}>
          <Typography variant="h6">
            Event Details for {selectedEvent.start.toLocaleDateString()}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            <strong>Title:</strong> {selectedEvent.title}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            <strong>Description:</strong> {selectedEvent.description}
          </Typography>
          {selectedEvent.image && (
            <img
              src={selectedEvent.image}
              alt="Event"
              style={{
                width: "100%",
                height: "auto",
                marginTop: "1rem",
                borderRadius: "4px",
              }}
            />
          )}
          <div style={{ marginTop: "1rem" }}>
            <strong>Platforms:</strong>
            <div
              style={{ marginTop: "0.5rem", display: "flex", gap: "0.25rem" }}
            >
              {selectedEvent.platforms.map((platform) => (
                <div
                  key={platform.name}
                  style={{
                    height: "16px",
                    width: "16px",
                    borderRadius: "4px",
                    backgroundColor: "#e5e7eb",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  title={platform.name}
                >
                  <img
                    src={platform.logo}
                    alt={platform.name}
                    style={{ height: "12px", width: "12px" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </Paper>
      )}
    </div>
  );
};
