import React, { useState } from "react";

const EventModal = ({ onClose, onSave }) => {
  const [eventData, setEventData] = useState({
    name: "",
    startTime: "",
    endTime: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSave = () => {
    if (eventData.name && eventData.startTime && eventData.endTime) {
      onSave(eventData);
      onClose();
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <div>
      <h3>Add Event</h3>
      <input
        type="text"
        name="name"
        placeholder="Event Name"
        value={eventData.name}
        onChange={handleInputChange}
      />
      <input
        type="time"
        name="startTime"
        value={eventData.startTime}
        onChange={handleInputChange}
      />
      <input
        type="time"
        name="endTime"
        value={eventData.endTime}
        onChange={handleInputChange}
      />
      <textarea
        name="description"
        placeholder="Event Description (Optional)"
        value={eventData.description}
        onChange={handleInputChange}
      ></textarea>
      <div className="button-container ">
      <button className="modal_button" onClick={handleSave}>Save</button>
      <button className="modal_button" onClick={onClose}>Cancel</button>
      </div>

    </div>
  );
};

export default EventModal;