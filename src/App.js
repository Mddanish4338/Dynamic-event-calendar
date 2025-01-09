import React from 'react';
import Navbar from './components/Navbar';
import CalendarGrid from './components/CalendarGrid';
import useLocalStorage from './hooks/useLocalStorage';
import "./App.css";

const App = () => {
  const [events, setEvents] = useLocalStorage('events', []);

  return (
    <div>
      <Navbar />
      <main>
        <CalendarGrid events={events} setEvents={setEvents} />
      </main>
      
    </div>
  );
};

export default App;
