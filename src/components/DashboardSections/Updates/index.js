'use client';
import React, { useEffect } from 'react';
import { useLazyGetAnnouncementsQuery } from '../../../store/queries/announcement';
import { useSelector } from 'react-redux';

export const Updates = () => {
  const [getAnnouncements, { data, isError, isLoading }] =
    useLazyGetAnnouncementsQuery();

  const announcementYear = useSelector((state) => state.announcement.year);

  useEffect(() => {
    getAnnouncements(announcementYear);
  }, [announcementYear, getAnnouncements]);

  console.log(data, isLoading);

  return <div>Updates</div>;
};
