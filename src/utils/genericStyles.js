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
  row: {
    flexDirection: 'row',
  },
  shadows: {
    elevation: 10,
    shadowOffset: {
      height: 5,
      width: 0,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
  },
});
