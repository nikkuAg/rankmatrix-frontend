// Light Theme
const lightTheme = {
  primary: {
    main: '#6096FC',
    light: '#D4E3FF',
    dark: '#467BED',
  },
  background: {
    main: '#FBFCFF',
    dark: '#F4F6FD',
    light: '#F8FAFF',
    default: '#FFFFFF',
  },
  text: {
    main: '#002942',
    dark: '#000000',
    light: '#FFFFFF',
    link: '#3245EB',
  },
  shadow: {
    main: 'rgba(0, 25, 71, 0.05)',
  },
  font: 'var(--font-poppins)',
  alert: {
    success: '#41E984',
    error: '#F95656',
    warning: '#FFCE42',
    low: '#FF834F',
  },
  gray: {
    light: '#E1E5F0',
    main: '#D5DAE9',
    dark: '#9EA9C1',
  },
};

// Dark Theme
const darkTheme = {
  primary: {
    main: '#0A245A',
    light: '#4B5E9E',
    dark: '#050F2C',
  },
  background: {
    main: '#121828',
    dark: '#14223D',
    light: '#173571',
    default: '#14223D',
  },
  text: {
    main: '#E1E7FD',
    dark: '#000000',
    light: '#FFFFFF',
    link: '#3245EB',
  },
  shadow: {
    main: 'rgba(0, 25, 71, 0.05)',
  },
  font: 'var(--font-poppins)',
  alert: {
    success: '#41E984',
    error: '#F95656',
    warning: '#FFCE42',
    low: '#FF834F',
  },
  gray: {
    light: '#474f60',
    main: '#173571',
    dark: '#B2CAFF',
  },
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};
