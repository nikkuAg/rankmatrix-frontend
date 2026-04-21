'use client';

import React, { useMemo, useState } from 'react';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
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

const EventDay = ({ eventDates, day, outsideCurrentMonth, ...other }) => {
  const theme = useTheme();
  const isEventDay = !outsideCurrentMonth && eventDates?.has(day.toDateString());
  const isDark = theme.palette.mode === 'dark';

  return (
    <PickersDay
      {...other}
      day={day}
      outsideCurrentMonth={outsideCurrentMonth}
      sx={{
        fontWeight: isEventDay ? 600 : 400,
        ...(isEventDay && {
          backgroundColor: isDark
            ? `${theme.palette.primary.light}40`
            : theme.palette.primary.light,
          color: isDark ? theme.palette.primary.light : theme.palette.primary.main,
          '&:hover': {
            backgroundColor: isDark
              ? `${theme.palette.primary.light}66`
              : theme.palette.primary.light,
          },
          '&:focus': {
            backgroundColor: isDark
              ? `${theme.palette.primary.light}66`
              : theme.palette.primary.light,
          },
        }),
      }}
    />
  );
};

export const EventCalendar = () => {
  const events = useSiteContent()?.event;
  const theme = useTheme();
  const [referenceDate, setReferenceDate] = useState(() => startOfDay(new Date()));
  const [selectedDay, setSelectedDay] = useState(null);

  const eventDates = useMemo(() => {
    const set = new Set();
    (events ?? []).forEach((event) => {
      const start = new Date(event.startDate);
      const end = event.endDate ? new Date(event.endDate) : start;
      eachDayOfInterval({ start, end }).forEach((d) => set.add(d.toDateString()));
    });
    return set;
  }, [events]);

  const monthEvents = useMemo(() => {
    if (!events?.length) return [];
    const start = startOfMonth(referenceDate);
    const end = endOfMonth(referenceDate);
    return events.filter((event) => {
      const s = startOfDay(new Date(event.startDate));
      const e = event.endDate ? startOfDay(new Date(event.endDate)) : s;
      return isWithinInterval(s, { start, end }) || isWithinInterval(e, { start, end });
    });
  }, [events, referenceDate]);

  const eventsToShow = useMemo(() => {
    if (!selectedDay) return monthEvents;
    return monthEvents.filter((event) => {
      const s = startOfDay(new Date(event.startDate));
      const e = event.endDate ? startOfDay(new Date(event.endDate)) : s;
      return isWithinInterval(selectedDay, { start: s, end: e });
    });
  }, [selectedDay, monthEvents]);

  const handleChange = (date) => {
    if (!date) return;
    const day = startOfDay(date);
    setSelectedDay((prev) => (prev && isSameDay(prev, day) ? null : day));
  };

  const handleViewChange = (date) => {
    setReferenceDate(date);
    setSelectedDay(null);
  };

  const dayColor =
    theme.palette.mode === 'dark' ? theme.palette.text.light : theme.palette.text.dark;

  return (
    <Stack
      width="100%"
      height="100%"
      px="1rem"
      py="1.5rem"
      gap={1}
      sx={{
        backgroundColor: theme.background.dark,
        borderRadius: '12px',
        boxShadow: `0px 0px 15px -6px ${theme.palette.shadow.main}`,
        color: theme.palette.text.main,
      }}
    >
      <Typography fontWeight={500} fontSize="1.2rem">
        Important Dates
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateCalendar
          value={selectedDay}
          referenceDate={referenceDate}
          onChange={handleChange}
          onMonthChange={handleViewChange}
          onYearChange={handleViewChange}
          slots={{ day: EventDay }}
          slotProps={{ day: { eventDates } }}
          sx={{
            width: '100%',
            height: 'auto',
            margin: 0,
            '& .MuiPickersCalendarHeader-root': { mt: 0, mb: 0.5, pl: 1, pr: 1 },
            '& .MuiPickersCalendarHeader-label': { fontWeight: 600 },
            '& .MuiDayCalendar-weekDayLabel': {
              color: dayColor,
              opacity: 0.5,
              fontWeight: 400,
            },
            '& .MuiPickersDay-root': {
              color: dayColor,
              '&.MuiPickersDay-today': {
                border: `2px solid ${theme.palette.primary.main}`,
                backgroundColor: 'transparent',
                color: theme.palette.primary.main,
              },
              '&.Mui-selected, &.Mui-selected.MuiPickersDay-today': {
                backgroundColor: `${theme.palette.primary.main} !important`,
                color: theme.palette.text.light,
                '&:hover, &:focus': {
                  backgroundColor: `${theme.palette.primary.main} !important`,
                },
              },
              '&.MuiPickersDay-dayOutsideMonth': {
                color: dayColor,
                opacity: 0.25,
              },
            },
          }}
        />
      </LocalizationProvider>
      <Stack gap={1} pt={1} maxHeight="45%" sx={{ overflowY: 'auto' }}>
        {eventsToShow.map((event, index) => (
          <Box
            key={`${event.title}-${index}`}
            display="grid"
            gridTemplateColumns="1.2fr 3fr"
            columnGap={2}
            alignItems="center"
          >
            <Stack direction="row" alignItems="center" gap={0.5}>
              <Typography
                component="span"
                fontSize="1rem"
                padding="0.2rem 0.5rem"
                borderRadius="50%"
                bgcolor={theme.palette.primary.main}
                color={theme.palette.text.light}
              >
                {format(new Date(event.startDate), 'dd')}
              </Typography>
              {event.endDate && (
                <>
                  {' - '}
                  <Typography
                    component="span"
                    fontSize="1rem"
                    padding="0.2rem 0.5rem"
                    borderRadius="50%"
                    bgcolor={theme.palette.primary.main}
                    color={theme.palette.text.light}
                  >
                    {format(new Date(event.endDate), 'dd')}
                  </Typography>
                </>
              )}
            </Stack>
            <Typography fontSize="1rem" component="div">
              {event.title}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
};
