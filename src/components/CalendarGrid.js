import React, { useState, useEffect, useCallback } from "react";
import EventModal from "./EventModal";
import EventList from "./EventList";
import useLocalStorage from "../hooks/useLocalStorage";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";

const CalendarGrid = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [dailyEvents, setDailyEvents] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const [events, setEvents] = useLocalStorage("events", []);

  const getEventsForDay = useCallback((day) => {
    return events.filter((event) => event.date === day);
  }, [events]);

  useEffect(() => {
    if (selectedDay) {
      setDailyEvents(getEventsForDay(selectedDay));
    }
  }, [selectedDay, events, getEventsForDay]);

  
  const addEvent = (eventData, eventIndex = null) => {
    if (eventIndex !== null) {
      
      const updatedEvents = events.map((event, index) =>
        index === eventIndex && event.date === selectedDay
          ? { ...event, ...eventData }  
          : event
      );
      setEvents(updatedEvents);
    } else {
      
      const updatedEvents = [
        ...events,
        { ...eventData, date: selectedDay },
      ];
      setEvents(updatedEvents);
    }
  };

  const deleteEvent = (eventIndex) => {
    const updatedEvents = events.filter(
      (event, index) => !(event.date === selectedDay && index === eventIndex)
    );
    setEvents(updatedEvents);
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setShowModal(true);
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const renderDays = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const totalCells = firstDay + daysInMonth;

    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="empty-cell"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const day = `${currentYear}-${currentMonth + 1}-${i}`;
      days.push(
        <div
          key={i}
          className={`day ${selectedDay === day ? "selected" : ""}`}
          onClick={() => handleDayClick(day)}
          aria-label={`Day ${i}`}
        >
          {i}
        </div>
      );
    }

    for (let i = totalCells; i % 7 !== 0; i++) {
      days.push(<div key={`empty-${i}`} className="empty-cell"></div>);
    }

    return days;
  };

  const renderDayNames = () => {
    return (
      <div className="day-names">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
          <div key={index} className="day-name">
            {day}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="calendar">
      <header>
        <h2>Dynamic Event Calendar</h2>
        <div className="nav-buttons">
          <button className="next_button" onClick={handlePrevMonth}>
            <TbPlayerTrackPrevFilled />
          </button>
          <span>
            {new Date(currentYear, currentMonth).toLocaleString("default", {
              month: "long",
            })}{" "}
            {currentYear}
          </span>
          <button className="previous_button" onClick={handleNextMonth}>
            <TbPlayerTrackNextFilled />
          </button>
        </div>
      </header>

      {renderDayNames()}

      <div className="grid">{renderDays()}</div>

      {showModal && (
        <div className="modal">
          <h3>Events for {selectedDay}</h3>
          <EventList 
            events={dailyEvents} 
            onDelete={deleteEvent} 
            onEdit={addEvent}
          />
          <EventModal 
            onClose={() => setShowModal(false)} 
            onSave={(eventData) => addEvent(eventData)} 
          />
        </div>
      )}
    </div>
  );
};

export default CalendarGrid;
