import React from 'react';
import {render} from 'react-native-testing-library';
import Header from '../../src/components/Header';

jest.mock('react-redux', () => {
  const ActualReactRedux = require.requireActual('react-redux');
  return {
    ...ActualReactRedux,
    useSelector: jest.fn().mockImplementation(() => {
      return {
        themes: {
          themeColorType: 'light',
        },
      };
    }),
  };
});

describe('Header Tests', () => {
  it('displays the passed-in title', () => {
    const {queryByText} = render(<Header title="Shows Screen" />);
    expect(queryByText('Shows Screen')).not.toBeNull();
  });
});
