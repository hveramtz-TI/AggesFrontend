'use client';
import React, { useState } from 'react';

const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

const Calendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  // Generar celdas vacías para los días antes del primer día del mes
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => <div key={"b" + i}></div>);
  // Generar los días del mes
  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const isToday =
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear();
    return (
      <div
        key={day}
        className={`flex items-center justify-center h-10 w-full rounded-full cursor-pointer transition-colors font-medium ${isToday ? 'bg-(--color-primary) text-(--color-white) font-bold' : 'hover:bg-(--color-light-green) text-(--color-dark-gray)'}`}
      >
        {day}
      </div>
    );
  });

  return (
    <div className="w-full mx-auto p-4 bg-(--color-white) rounded-lg shadow-md border border-(--color-light-green)">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="px-2 py-1 rounded hover:bg-(--color-light-green) text-(--color-primary) font-bold text-lg"
          aria-label="Mes anterior"
        >&#8592;</button>
        <div className="font-semibold text-lg text-(--color-dark-gray)">{monthNames[currentMonth]} {currentYear}</div>
        <button
          onClick={nextMonth}
          className="px-2 py-1 rounded hover:bg-(--color-light-green) text-(--color-primary) font-bold text-lg"
          aria-label="Mes siguiente"
        >&#8594;</button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map((d) => (
          <div key={d} className="text-center font-bold text-(--color-primary)">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {blanks}
        {days}
      </div>
    </div>
  );
};

export default Calendar;