import React from 'react';
import moment from 'moment';

interface CalendarProps {
  bookings: any[];
  onDateSelect?: (date: Date) => void;
  selectedDate?: Date;
  minDate?: Date;
  maxDate?: Date;
}

const Calendar: React.FC<CalendarProps> = ({
  bookings,
  onDateSelect,
  selectedDate,
  minDate = new Date(),
  maxDate,
}) => {
  const [currentMonth, setCurrentMonth] = React.useState(moment());
  
  const daysInMonth = currentMonth.daysInMonth();
  const firstDayOfMonth = moment(currentMonth).startOf('month').day();
  const today = moment();

  const isDateBooked = (date: moment.Moment) => {
    return bookings.some(booking => 
      date.isBetween(moment(booking.checkIn), moment(booking.checkOut), null, '[]')
    );
  };

  const isDateSelectable = (date: moment.Moment) => {
    if (minDate && date.isBefore(moment(minDate), 'day')) return false;
    if (maxDate && date.isAfter(moment(maxDate), 'day')) return false;
    return !isDateBooked(date);
  };

  const handleDateClick = (date: moment.Moment) => {
    if (onDateSelect && isDateSelectable(date)) {
      onDateSelect(date.toDate());
    }
  };

  const generateCalendar = () => {
    const calendar = [];
    let day = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDayOfMonth) {
          week.push(
            <td key={`empty-${j}`} className="p-2 border-0" />
          );
        } else if (day > daysInMonth) {
          break;
        } else {
          const currentDate = moment(currentMonth).date(day);
          const isBooked = isDateBooked(currentDate);
          const isSelectable = isDateSelectable(currentDate);
          const isSelected = selectedDate && currentDate.isSame(moment(selectedDate), 'day');
          const isToday = currentDate.isSame(today, 'day');

          week.push(
            <td key={day} className="p-1">
              <button
                onClick={() => handleDateClick(currentDate)}
                disabled={!isSelectable}
                className={`
                  w-full aspect-square rounded-lg text-sm font-medium
                  transition-all duration-200 relative
                  ${isSelectable ? 'hover:bg-primary-100' : 'cursor-not-allowed opacity-50'}
                  ${isSelected ? 'bg-primary-600 text-white' : 'bg-white'}
                  ${isToday ? 'ring-2 ring-primary-500' : ''}
                  ${isBooked ? 'bg-red-100' : ''}
                `}
              >
                {day}
                {isBooked && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full" />
                )}
              </button>
            </td>
          );
          day++;
        }
      }
      calendar.push(<tr key={i}>{week}</tr>);
      if (day > daysInMonth) break;
    }

    return calendar;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setCurrentMonth(moment(currentMonth).subtract(1, 'month'))}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          ←
        </button>
        <h3 className="text-lg font-semibold">
          {currentMonth.format('MMMM YYYY')}
        </h3>
        <button
          onClick={() => setCurrentMonth(moment(currentMonth).add(1, 'month'))}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          →
        </button>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
              <th key={day} className="p-2 text-xs font-medium text-gray-500">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{generateCalendar()}</tbody>
      </table>
      <div className="mt-4 flex items-center justify-end space-x-4 text-sm">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-100 rounded-full mr-2" />
          <span className="text-gray-600">Booked</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-primary-600 rounded-full mr-2" />
          <span className="text-gray-600">Selected</span>
        </div>
      </div>
    </div>
  );
};

export default Calendar;