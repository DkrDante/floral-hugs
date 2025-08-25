import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CalendarView = ({ selectedDate, onDateSelect, specialDates, scheduledGifts }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0)?.getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1)?.getDay();
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate?.setMonth(prev?.getMonth() + direction);
      return newDate;
    });
  };

  const isToday = (day) => {
    const today = new Date();
    return day === today?.getDate() && 
           currentMonth?.getMonth() === today?.getMonth() && 
           currentMonth?.getFullYear() === today?.getFullYear();
  };

  const isSelected = (day) => {
    if (!selectedDate) return false;
    return day === selectedDate?.getDate() && 
           currentMonth?.getMonth() === selectedDate?.getMonth() && 
           currentMonth?.getFullYear() === selectedDate?.getFullYear();
  };

  const getDateKey = (day) => {
    return `${currentMonth?.getFullYear()}-${(currentMonth?.getMonth() + 1)?.toString()?.padStart(2, '0')}-${day?.toString()?.padStart(2, '0')}`;
  };

  const hasSpecialDate = (day) => {
    const dateKey = getDateKey(day);
    return specialDates?.some(special => special?.date === dateKey);
  };

  const hasScheduledGift = (day) => {
    const dateKey = getDateKey(day);
    return scheduledGifts?.some(gift => gift?.deliveryDate === dateKey);
  };

  const getSpecialDateInfo = (day) => {
    const dateKey = getDateKey(day);
    return specialDates?.find(special => special?.date === dateKey);
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days?.push(<div key={`empty-${i}`} className="h-12"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isCurrentDay = isToday(day);
      const isSelectedDay = isSelected(day);
      const hasSpecial = hasSpecialDate(day);
      const hasGift = hasScheduledGift(day);
      const specialInfo = getSpecialDateInfo(day);

      days?.push(
        <div
          key={day}
          onClick={() => onDateSelect(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))}
          className={`h-12 flex flex-col items-center justify-center cursor-pointer rounded-lg transition-all duration-300 relative group hover:bg-primary/10 hover:shadow-romantic ${
            isCurrentDay ? 'bg-accent text-accent-foreground font-semibold' : ''
          } ${
            isSelectedDay ? 'bg-secondary text-secondary-foreground shadow-romantic' : ''
          } ${
            hasSpecial ? 'border-2 border-primary' : ''
          }`}
        >
          <span className={`text-sm ${isCurrentDay || isSelectedDay ? 'font-semibold' : 'font-medium'}`}>
            {day}
          </span>
          
          {/* Special date indicator */}
          {hasSpecial && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse-gentle">
              <Icon name={specialInfo?.icon} size={8} className="text-primary-foreground absolute top-0.5 left-0.5" />
            </div>
          )}
          
          {/* Scheduled gift indicator */}
          {hasGift && (
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-secondary rounded-full"></div>
          )}
          
          {/* Hover tooltip */}
          {(hasSpecial || hasGift) && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-romantic opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
              {hasSpecial && <div>{specialInfo?.title}</div>}
              {hasGift && <div>Gift scheduled</div>}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="bg-card rounded-xl shadow-romantic p-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigateMonth(-1)}
          className="text-muted-foreground hover:text-secondary"
        >
          <Icon name="ChevronLeft" size={20} />
        </Button>
        
        <div className="text-center">
          <h3 className="font-playfair text-xl font-semibold text-foreground">
            {monthNames?.[currentMonth?.getMonth()]} {currentMonth?.getFullYear()}
          </h3>
          <p className="text-sm text-muted-foreground font-inter">
            Plan your perfect moments
          </p>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigateMonth(1)}
          className="text-muted-foreground hover:text-secondary"
        >
          <Icon name="ChevronRight" size={20} />
        </Button>
      </div>
      {/* Days of week header */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']?.map(day => (
          <div key={day} className="h-8 flex items-center justify-center">
            <span className="text-sm font-medium text-muted-foreground font-inter">
              {day}
            </span>
          </div>
        ))}
      </div>
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {renderCalendarDays()}
      </div>
      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-inter">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-accent rounded-full"></div>
            <span className="text-muted-foreground">Today</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 border-2 border-primary rounded-full"></div>
            <span className="text-muted-foreground">Special Date</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-secondary rounded-full"></div>
            <span className="text-muted-foreground">Gift Scheduled</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;