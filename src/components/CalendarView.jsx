import React from 'react';

const CalendarView = ({ appointments, onDayClick }) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();

  const calendarDays = [];

  
  for (let i = 0; i < startDay; i++) {
    calendarDays.push(<div key={`blank-${i}`} className="border h-20"></div>);
  }

 
  for (let d = 1; d <= daysInMonth; d++) {
    const dateKey = `${year}-${month + 1}-${d}`;
    const dayAppointments = appointments.filter(a => a.date === dateKey);

    calendarDays.push(
      <div
        key={d}
        className="border h-20 p-1 cursor-pointer hover:bg-blue-100"
        onClick={() => onDayClick(dateKey)}
      >
        <p className="text-sm font-semibold">{d}</p>
        {dayAppointments.map((a, i) => (
          <p key={i} className="text-xs truncate">{a.patient} - {a.time}</p>
        ))}
      </div>
    );
  }

  return (
    <>
     
     <div className="hidden md:grid grid-cols-7 gap-1">
  {calendarDays}
</div>

<div className="md:hidden space-y-4">
  {[...Array(daysInMonth).keys()].map((i) => {
    const d = i + 1;
    const dateKey = `${year}-${month + 1}-${d}`;
    const dayAppointments = appointments.filter((a) => a.date === dateKey);

    return (
      <div
        key={d}
        onClick={() => onDayClick(dateKey)}
        className="border rounded-xl shadow-sm p-4 bg-white hover:bg-blue-50 transition-all duration-300 cursor-pointer"
      >
        <p className="text-lg font-semibold text-blue-700 mb-2">
          📅 Date: {dateKey}
        </p>
        {dayAppointments.length > 0 ? (
          dayAppointments.map((a, i) => (
            <div
              key={i}
              className="bg-blue-100 text-blue-800 rounded-lg p-2 mb-2 shadow-sm"
            >
              <p className="text-sm font-medium">{a.patient}</p>
              <p className="text-xs">
                with <span className="font-semibold">{a.doctor}</span> at{" "}
                <span className="font-semibold">{a.time}</span>
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm italic">No appointments</p>
        )}
      </div>
    );
  })}
</div>

    </>
  );
};

export default CalendarView;
