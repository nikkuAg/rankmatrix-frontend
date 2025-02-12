import { useSiteContent } from '@/store/selectors/siteContent';
import React, { useState, useEffect } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isWithinInterval,
} from 'date-fns';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Box, Typography, useTheme } from '@mui/material';

export const EventCalendar = () => {
  const events = useSiteContent()?.event;
  const theme = useTheme();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    if (events) {
      const startMonth = startOfMonth(selectedDate);
      const endMonth = endOfMonth(selectedDate);

      const monthEvents = events.filter((event) => {
        const start = new Date(event.startDate);
        const end = event.endDate ? new Date(event.endDate) : start;
        return (
          isWithinInterval(start, { start: startMonth, end: endMonth }) ||
          isWithinInterval(end, { start: startMonth, end: endMonth })
        );
      });

      setFilteredEvents(monthEvents);
    }
  }, [events, selectedDate]);

  const eventDates = new Set();
  filteredEvents.forEach((event) => {
    const start = new Date(event.startDate);
    const end = event.endDate ? new Date(event.endDate) : start;

    eachDayOfInterval({ start, end }).forEach((date) => {
      eventDates.add(date.toDateString());
    });
  });

  const highlightDates = ({ date }) => {
    const isToday = isSameDay(date, new Date());
    const isSelected = selectedDate && isSameDay(date, selectedDate);
    const isEventDate = eventDates.has(date.toDateString());
    let sx = {};
    if (isToday) {
      console.log(date, 'jkdfk');
      // sx = {
      //   background: '#ff6347',
      //   borderRadius: '10px',
      //   width: '80%',
      //   height: '80%',
      // };
    }

    // if (eventDates.has(date.toDateString())) {
    //   return (
    //     <div
    //       style={{
    //         // background: isSameDay(date, selectedDay) ? "#ffa500" : "#ff6347",
    //         borderRadius: '10px',
    //         width: '80%',
    //         height: '80%',
    //       }}
    //     />
    //   );
    // }
    return <Box sx={sx} />;
  };

  const dayEvents = selectedDay
    ? filteredEvents.filter((event) => {
        const start = new Date(event.startDate);
        const end = event.endDate ? new Date(event.endDate) : start;
        return isWithinInterval(selectedDay, { start, end });
      })
    : filteredEvents;

  const handleDateClick = (date) => {
    setSelectedDay((prev) => (isSameDay(prev, date) ? null : date));
    setSelectedDate(date);
  };

  return (
    <Box
      width="100%"
      padding={2}
      sx={{
        backgroundColor: theme.palette.primary[10],
        borderRadius: '5px',
        maxHeight: '75vh',
        height: '60vh',
        '& .react-calendar': {
          width: '100%',
          background: theme.palette.tertiary[30],
          border: 0,
          fontFamily: theme.typography.fontFamily,
        },
        '& .react-calendar__navigation button': {
          color: theme.palette.text.secondary,
          fontWeight: 'bold',
          '&:hover': {
            background: `${theme.palette.tertiary[20]} !important`,
          },
          '&:focus': {
            background: `${theme.palette.tertiary[20]} !important`,
          },
          '&:disabled': {
            background: `${theme.palette.tertiary[10]} !important`,
          },
        },
        '& .react-calendar__tile': {
          textAlign: 'center',
          padding: '8px',
          borderRadius: '8px',
          transition: 'background 0.3s',
          // backgroundColor: theme.palette.primary[70],
          '&:hover': {
            backgroundColor: theme.palette.primary[70] + ' !important',
            color: theme.palette.text.secondary,
          },
          '&:focus': {
            backgroundColor: theme.palette.primary[70] + ' !important',
            color: theme.palette.text.secondary,
          },
        },
        '& .react-calendar__tile--now': {
          backgroundColor: 'transparent',
          color: theme.palette.text.secondary,
          border: '2px solid ' + theme.palette.primary[70],
          '&.react-calendar__tile--active': {
            backgroundColor: theme.palette.primary[70] + ' !important',
            color: theme.palette.text.secondary,
            border: '0px',
          },
        },
        '& .react-calendar__tile--active': {
          backgroundColor: theme.palette.primary[70],
          color: theme.palette.text.secondary,
          // border: selectedDay
          //   ? '2px solid ' + theme.palette.primary[70]
          //   : 'none',
        },
        '& .react-calendar__month-view__days__day--neighboringMonth': {
          color: theme.palette.text.secondary,
          opacity: 0.5,
        },
      }}
    >
      <Typography fontWeight={'600'} fontSize={'1.2rem'}>
        Important Dates
      </Typography>
      <Calendar
        // onActiveStartDateChange={({ activeStartDate }) =>
        //   setSelectedDate(activeStartDate)
        // }
        onClickDay={handleDateClick}
        tileContent={highlightDates}
        value={selectedDate}
      />
    </Box>
  );
};
