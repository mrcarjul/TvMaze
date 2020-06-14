import {StyleSheet} from 'react-native';

const size = {
  title: 26,
  h2: 20,
  regular: 17,
};

const textStyle = StyleSheet.create({
  centeredTitle: {
    fontSize: size.title,
    textAlign: 'center',
  },
  centeredSectionTitle: {
    fontSize: size.h2,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: size.h2,
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
