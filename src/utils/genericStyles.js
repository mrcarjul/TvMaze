import {StyleSheet} from 'react-native';

/**
 * @description Generic styles to be used in more than one component/sceen
 * @returns {StyleProp} with reusable styles objects
 */
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContents: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
