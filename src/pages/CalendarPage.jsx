import React, { useState, useEffect } from "react";
import CalendarView from "../components/CalendarView";
import AppointmentForm from "../components/AppointmentForm";
import { loadAppointments, saveAppointments } from "../utils/localStorage";

const CalendarPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState({
    patient: "",
    doctor: "",
    time: "",
    date: "",
  });
  const [selectedDate, setSelectedDate] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const stored = loadAppointments();
    setAppointments(stored);

    if (localStorage.getItem("isLoggedIn") !== "true") {
      window.location.href = "/";
    }
  }, []);

  const handleDayClick = (date) => {
    setSelectedDate(date);
    setFormData({ patient: "", doctor: "", time: "", date });
    setIsEditing(false);
    setEditingIndex(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updated;
    if (isEditing) {
      updated = [...appointments];
      updated[editingIndex] = formData;
    } else {
      updated = [...appointments, formData];
    }
    setAppointments(updated);
    saveAppointments(updated);
    setSelectedDate("");
    setFormData({ patient: "", doctor: "", time: "", date: "" });
    setIsEditing(false);
    setEditingIndex(null);
  };

  const handleEdit = (appt, index) => {
    setFormData(appt);
    setIsEditing(true);
    setEditingIndex(index);
    setSelectedDate(appt.date);
  };

  const handleDelete = (index) => {
    const updated = appointments.filter((_, i) => i !== index);
    setAppointments(updated);
    saveAppointments(updated);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/";
  };

  return (
    <div className="p-4 max-w-4xl mx-auto relative">
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>

      <h2 className="text-xl font-bold mb-4">Appointment Calendar</h2>

      <CalendarView appointments={appointments} onDayClick={handleDayClick} />

      {selectedDate && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">
            Appointments on {selectedDate}
          </h3>

          {appointments
            .map((appt, i) => ({ ...appt, index: i }))
            .filter((a) => a.date === selectedDate)
            .map((a) => (
              <div
                key={a.index}
                className="flex justify-between items-center p-2 border rounded mb-2"
              >
                <p>
                  {a.patient} with {a.doctor} at {a.time}
                </p>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(a, a.index)}
                    className="text-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(a.index)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

          <AppointmentForm
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
          />
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
