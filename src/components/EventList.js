import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const EventList = ({ events, onDelete, onEdit }) => {
  const [editingEvent, setEditingEvent] = useState(null);

  if (!events || events.length === 0) {
    return <p>No events for this day.</p>;
  }

  const handleEditClick = (event, index) => {
    setEditingEvent({ ...event, index });
  };

  const handleSaveEdit = (updatedEvent) => {
    onEdit(updatedEvent, editingEvent.index);
    setEditingEvent(null);
  };

  return (
    <div>
      <h3>Events</h3>
      <ul>
        {events.map((event, index) => (
          <li key={index} style={{ marginBottom: "10px" }}>
            <strong>{event.name}</strong>
            <p>{event.startTime} - {event.endTime}</p>
            <p>{event.description}</p>
            <div className="eventlist_buttoncontainer">
              <button
                onClick={() => handleEditClick(event, index)}
                style={{
                    backgroundColor: "blue",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
              >
                <FaEdit />
              </button>
              <button
                onClick={() => onDelete(index)}
                style={{
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
              >
                <MdDelete />
              </button>
            </div>

            {editingEvent && editingEvent.index === index && (
              <div className="edit-modal">
                <h4>Edit Event</h4>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSaveEdit({
                      ...event,
                      name: e.target.name.value,
                      startTime: e.target.startTime.value,
                      endTime: e.target.endTime.value,
                      description: e.target.description.value,
                    });
                  }}
                >
                  <input
                    type="text"
                    name="name"
                    defaultValue={event.name}
                    required
                  />
                  <input
                    type="text"
                    name="startTime"
                    defaultValue={event.startTime}
                    required
                  />
                  <input
                    type="text"
                    name="endTime"
                    defaultValue={event.endTime}
                    required
                  />
                  <textarea
                    name="description"
                    defaultValue={event.description}
                    required
                  />
                  <div className="button-container ">
                    <button
                      type="submit"
                      className="modal_button"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingEvent(null)}
                      className="modal_button"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
