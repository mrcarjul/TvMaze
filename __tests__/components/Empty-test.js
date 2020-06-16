import React from 'react';
import renderer from 'react-test-renderer';
import {render} from 'react-native-testing-library';
import Empty from '../../src/components/Empty';

jest.mock('react-redux', () => {
  const ActualReactRedux = require.requireActual('react-redux');
  return {
    ...ActualReactRedux,
    useSelector: jest.fn().mockImplementation(() => {
      return {
        shows: {
          error: false,
          errorMsg: false,
          fetching: false,
        },
      };
    }),
  };
});

describe('Empty Tests', () => {
  it('renders correctly', () => {
    renderer.create(<Empty />);
  });

  it('renders the correct message', () => {
    const {queryByText} = render(<Empty />);
    expect(
      queryByText('No information Available at the moment'), // Based in mocked store
    ).not.toBeNull();
  });
});
