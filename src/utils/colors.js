const lightThemeColors = {
  primary: '#fefefe',
  secondary: '#b9e3de',
  background: '#1f4b47',
  backgroundAlt: '#3C948B',
  backgroundSecondaryAlt: '#3F3F3F',
  text: '#0a0a0a',
  textAlt: '#fefefe',
};

const darkThemeColors = {
  primary: '#fefefe',
  secondary: '#b9e3de',
  background: '#1f4b47',
  backgroundAlt: '#3C948B',
  backgroundSecondaryAlt: '#3F3F3F',
  text: '#0a0a0a',
  textAlt: '#fefefe',
};

const getThemeColors = themeType => {
  if (themeType === 'light') {
    return lightThemeColors;
  }
  return darkThemeColors;
};

export default getThemeColors;
