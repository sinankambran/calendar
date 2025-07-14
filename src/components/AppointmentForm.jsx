import React from "react";

const AppointmentForm = ({ formData, setFormData, handleSubmit }) => (
  <form onSubmit={handleSubmit} className="space-y-4">
    <select
      value={formData.patient}
      onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
    ></select>
    <select
      value={formData.doctor}
      onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
    ></select>
    <input
      type="time"
      value={formData.time}
      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
    />
    <button type="submit">Save</button>
  </form>
);

export default AppointmentForm;
