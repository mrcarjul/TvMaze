const lightThemeColors = {
  primary: '#3C948B',
  background: '#3F3F3F',
  backgroundAlt: '#fefefe',
  backgroundSecondaryAlt: '#3F3F3F',
  text: '#0a0a0a',
  textAlt: '#b9e3de',
  textSecondaryAlt: '#fefefe',
};

const darkThemeColors = {
  primary: '#fefefe',
  background: '#1f4b47',
  backgroundAlt: '#3C948B',
  backgroundSecondaryAlt: '#3F3F3F',
  text: '#0a0a0a',
  textAlt: '#fefefe',
  textSecondaryAlt: '#fefefe',
};

const getThemeColors = themeType => {
  if (themeType === 'light') {
    return lightThemeColors;
  }
  return darkThemeColors;
};

export default getThemeColors;
