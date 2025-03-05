import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Grid2, Stack, Typography, useTheme } from '@mui/material';
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  isSameDay,
  isWithinInterval,
  startOfDay,
  startOfMonth,
} from 'date-fns';
import { useSiteContent } from '@/store/selectors/siteContent';

export const EventCalendar = () => {
  const events = useSiteContent()?.event;
  const theme = useTheme();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [eventsToShow, setEventsToShow] = useState([]);

  useEffect(() => {
    if (events) {
      const startMonth = startOfMonth(selectedDate);
      const endMonth = endOfMonth(selectedDate);

      const monthEvents = events.filter((event) => {
        const start = startOfDay(new Date(event.startDate));
        const end = event.endDate ? startOfDay(new Date(event.endDate)) : start;
        return (
          isWithinInterval(start, { start: startMonth, end: endMonth }) ||
          isWithinInterval(end, { start: startMonth, end: endMonth })
        );
      });
      setEventsToShow(monthEvents);
      setFilteredEvents(monthEvents);
    }
  }, [events, selectedDate]);

  useEffect(() => {
    if (selectedDay) {
      const dayEvents = events.filter((event) => {
        const start = startOfDay(new Date(event.startDate));
        const end = event.endDate ? startOfDay(new Date(event.endDate)) : start;
        return isWithinInterval(selectedDay, { start, end });
      });
      setEventsToShow(dayEvents);
    } else {
      setEventsToShow(filteredEvents);
    }
  }, [selectedDay, filteredEvents, events]);

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

    if (isEventDate) {
      if (!(isToday && isSelected)) {
        return <div className="rankmatrix-event-date"></div>;
      }
    }
    return '';
  };

  const handleDateClick = (date) => {
    setSelectedDay((prev) => (isSameDay(prev, date) ? null : startOfDay(date)));
    setSelectedDate(startOfDay(date));
  };

  return (
    <Stack
      width="100%"
      height={'80%'}
      px={'1rem'}
      py={'1.5rem'}
      gap={1}
      sx={{
        backgroundColor: theme.background.dark,
        borderRadius: '12px',
        boxShadow: `0px 0px 15px -6px ${theme.palette.shadow.main}`,
        color: theme.palette.text.main,
        '& .rankmatrix-event-date': {
          backgroundColor: `${theme.palette.primary.main}26`,
          color: theme.palette.primary.main,
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        },
        '& .react-calendar': {
          width: '100%',
          background: theme.background.default,
          borderRadius: '6px',
          borderColor: 'transparent',
          fontFamily: theme.typography.fontFamily,
          maxHeight: '100%',
        },
        '& .react-calendar__navigation': {
          marginBottom: '0.2rem',
        },
        '& .react-calendar__navigation button': {
          color: theme.palette.text.dark,
          '&:hover': {
            backgroundColor: `${theme.palette.primary.main}26 !important`,
            color: theme.palette.primary.main,
          },
          '&:focus': {
            backgroundColor: `${theme.palette.primary.main}26 !important`,
            color: theme.palette.primary.main,
          },
          '&.react-calendar__navigation__label': {
            fontWeight: '600',
          },
        },
        '& .react-calendar__month-view__weekdays__weekday': {
          fontWeight: '400',
          opacity: 0.5,
          color: theme.palette.text.dark,
          '& abbr': {
            textDecoration: 'none',
          },
        },
        '& .react-calendar__month-view__days__day--weekend': {
          color: theme.palette.text.dark,
        },
        '& .react-calendar__tile': {
          textAlign: 'center',
          borderRadius: '50%',
          position: 'relative',
          '&:hover': {
            backgroundColor: `${theme.palette.primary.main}26 !important`,
            color: theme.palette.primary.main,
          },
          '&:focus': {
            backgroundColor: `${theme.palette.primary.main}26 !important`,
            color: theme.palette.primary.main,
          },
        },
        '& .react-calendar__tile--now': {
          backgroundColor: 'transparent',
          color: theme.palette.primary.dark,
          border: '2px solid ' + theme.palette.primary.main,
          padding: 0,
          '&.react-calendar__tile--active': {
            backgroundColor: theme.palette.primary.main + ' !important',
            color: theme.palette.text.light,
          },
        },
        '& .react-calendar__tile--active': {
          backgroundColor: theme.palette.primary.main + ' !important',
          color: theme.palette.text.light,
          '&:focus:enabled': {
            backgroundColor: theme.palette.primary.main + ' !important',
            color: theme.palette.text.light,
          },
        },
        '& .react-calendar__month-view__days__day--neighboringMonth': {
          color: theme.palette.text.dark,
          opacity: 0.2,
        },
      }}
    >
      <Typography fontWeight={'500'} fontSize={'1.2rem'}>
        Important Dates
      </Typography>
      <Calendar
        onActiveStartDateChange={({ activeStartDate }) => setSelectedDate(activeStartDate)}
        tileClassName={highlightDates}
        onClickDay={handleDateClick}
        tileContent={highlightDates}
        value={selectedDay}
      />
      <Stack gap={1} pt={1}>
        {eventsToShow.map((event, index) => (
          <Grid2
            gridTemplateColumns={'1fr 3fr'}
            columnGap={2}
            display={'grid'}
            alignItems={'center'}
            key={index}
          >
            <Typography
              fontSize={'1rem'}
              width={'fit-content'}
              padding={'0.2rem 0.5rem'}
              borderRadius={'50%'}
              bgcolor={theme.palette.primary.main}
              color={theme.palette.text.light}
            >
              {format(new Date(event.startDate), 'dd')}
              {event.endDate && (
                <>
                  {' - '}
                  {format(new Date(event.endDate), 'dd')}
                </>
              )}
            </Typography>
            <Typography fontSize={'1rem'} flexGrow={1} flexWrap={'wrap'} component={'div'}>
              {event.title}
            </Typography>
          </Grid2>
        ))}
      </Stack>
    </Stack>
  );
};
