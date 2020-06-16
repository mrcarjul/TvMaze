import React from 'react';
import {shallow} from 'enzyme';
import {render} from 'react-native-testing-library';
import Summary from '../../src/components/Summary';

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

const mockSimpleSummary = {
  children: null,
  innerText: 'Summary Test 1',
  tagName: 'b',
};

const mockComplexSummary = {
  children: [mockSimpleSummary],
  innerText: 'Summary Text Container',
  tagName: 'p',
};

const mockUnsupportedSummary = {
  children: null,
  innerText: 'Summary Div Container',
  tagName: 'div',
};

describe('Summary Tests', () => {
  it('displays given object innerText to react native dom', () => {
    const {queryByText} = render(
      <Summary objectElements={mockSimpleSummary} />,
    );
    expect(queryByText('Summary Test 1')).not.toBeNull();
  });

  it('displays given object innerText of complex summary to react native dom', () => {
    const {queryByText} = render(
      <Summary objectElements={mockComplexSummary} />,
    );
    expect(queryByText('Summary Test 1')).not.toBeNull();
    expect(queryByText('Summary Text Container')).not.toBeNull();
  });

  it('avoids display if not valid tagName given', () => {
    const summary = shallow(
      <Summary objectElements={mockUnsupportedSummary} />,
    );
    expect(summary.isEmptyRender()).toBe(true);
  });
});
