const colors = {
  black: '#0a0a0a',
  gray: '#3F3F3F',
  green: '#3C948B',
  greenAlt: '#1f4b47',
  lightGreen: '#b9e3de',
  white: '#fefefe',
  whiteAlt: '#f1f1f1',
};

const lightThemeColors = {
  primary: colors.green,
  background: colors.gray,
  backgroundAlt: colors.white,
  backgroundSecondaryAlt: colors.whiteAlt,
  text: colors.black,
  textAlt: colors.lightGreen,
  textSecondaryAlt: colors.white,
};

const darkThemeColors = {
  primary: colors.green,
  background: colors.greenAlt,
  backgroundAlt: colors.gray,
  backgroundSecondaryAlt: colors.black,
  text: colors.white,
  textAlt: colors.white,
  textSecondaryAlt: colors.white,
};

const getThemeColors = themeType => {
  if (themeType === 'light') {
    return lightThemeColors;
  }
  return darkThemeColors;
};

export default getThemeColors;
