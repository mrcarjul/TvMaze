import {StyleSheet} from 'react-native';

const size = {
  title: 28,
  subtitle: 22,
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
    fontSize: size.title,
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
