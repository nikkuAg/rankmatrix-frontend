const PREDICTOR_KEY = 'rankmatrix:predictor-form';

export const loadPredictorFormData = () => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(PREDICTOR_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    // localStorage blocked (private mode) or corrupt JSON — treat as no data.
    return null;
  }
};

export const savePredictorFormData = (data) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(PREDICTOR_KEY, JSON.stringify(data));
  } catch {
    // Storage may be blocked (private mode, quota). Fail silently.
  }
};
