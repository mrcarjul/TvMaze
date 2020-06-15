import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const metrics = {
  imageRatio: 0.71,
  height,
  icon: 24,
  margin: 14,
  padding: 12,
  marginHorizontal: 10,
  marginVertical: 20,
  radius: 7,
  section: 50,
  width,
};

export default metrics;
