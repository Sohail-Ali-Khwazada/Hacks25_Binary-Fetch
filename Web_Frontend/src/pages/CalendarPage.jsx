import React from 'react';
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Paper } from "@mui/material";

const locales = {
  "en-US": enUS
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Sample events data
const events = [
  {
    id: 1,
    title: "Launch your own SaaS and start generating revenue.",
    start: new Date(2023, 6, 3),
    end: new Date(2023, 6, 3),
    platforms: ["twitter", "linkedin"],
  },
  {
    id: 2,
    title: "I assume that every giant company has a product for...",
    start: new Date(2023, 6, 6),
    end: new Date(2023, 6, 6),
    platforms: ["mastodon", "linkedin"],
  },
];

const EventComponent = ({ event }) => {
  return (
    <Paper 
      elevation={1} 
      sx={{ 
        p: 1,
        fontSize: '0.875rem',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff'
      }}
    >
      <p style={{ 
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        margin: 0
      }}>
        {event.title}
      </p>
      <div style={{ 
        marginTop: '0.25rem',
        display: 'flex',
        gap: '0.25rem'
      }}>
        {event.platforms.map((platform) => (
          <div 
            key={platform} 
            style={{
              height: '16px',
              width: '16px',
              borderRadius: '4px',
              backgroundColor: '#e5e7eb'
            }}
            title={platform}
          />
        ))}
      </div>
    </Paper>
  );
};

export const CalendarPage = () => {
  return (
    <div style={{ 
      height: 'calc(100vh - 4rem)',
      width: '100%',
    }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        components={{
          event: EventComponent,
        }}
        views={["month"]}
        className="bg-white"
      />
    </div>
  );
};