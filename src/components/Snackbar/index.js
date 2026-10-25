'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@/components/Icon';
import { closeToast } from '@/store/slices/toast';

export function SnackBar() {
  const toast = useSelector((state) => state.toast);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!toast.open) return;
    const timeout = setTimeout(() => dispatch(closeToast()), toast.duration || 6000);
    return () => clearTimeout(timeout);
  }, [toast.open, toast.duration, dispatch]);
  if (!toast.open) return null;
  return (
    <div className="toast" role="alert">
      <span>
        {toast.message?.length > 100 ? 'Something went wrong. Please try again.' : toast.message}
      </span>
      <button
        type="button"
        className="icon-button"
        aria-label="Dismiss notification"
        onClick={() => dispatch(closeToast())}
      >
        <Icon name="close" />
      </button>
    </div>
  );
}
