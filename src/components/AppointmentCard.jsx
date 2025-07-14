import React from 'react';

const AppointmentCard = ({ appointment }) => (
  <div className="p-2 border rounded shadow">
    <p>{appointment.patient}</p>
    <p>{appointment.doctor}</p>
    <p>{appointment.time}</p>
  </div>
);

export default AppointmentCard;
