import {StyleSheet} from 'react-native';

const size = {
  title: 28,
  subtitle: 22,
  normal: 20,
  regular: 17,
};

const textStyle = StyleSheet.create({
  centeredTitle: {
    fontSize: size.title,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  centeredSectionTitle: {
    fontSize: size.subtitle,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: size.subtitle,
  },
  normal: {
    fontSize: size.normal,
  },
  normalBold: {
    fontSize: size.normal,
    fontWeight: 'bold',
  },
  centeredNormal: {
    fontSize: size.normal,
    textAlign: 'center',
  },
  description: {
    fontSize: size.regular,
    textAlign: 'center',
  },
});

export default {
  size,
  textStyle,
};
