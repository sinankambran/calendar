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

      <div className="md:hidden">
        {[...Array(daysInMonth).keys()].map((i) => {
          const d = i + 1;
          const dateKey = `${year}-${month + 1}-${d}`;
          const dayAppointments = appointments.filter(a => a.date === dateKey);
          return (
            <div key={d} className="border-b p-4" onClick={() => onDayClick(dateKey)}>
              <p className="font-bold">Date: {dateKey}</p>
              {dayAppointments.map((a, i) => (
                <p key={i} className="text-sm">{a.patient} with {a.doctor} at {a.time}</p>
              ))}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CalendarView;
