import {SET_THEME_COLOR} from '../actions/themes';

const initialState = {
  themeColorType: 'light',
};

export default function themes(state = initialState, action) {
  switch (action.type) {
    case SET_THEME_COLOR:
      return {
        ...state,
        themeColorType: action.themeColorType,
      };
    default:
      return state;
  }
}
