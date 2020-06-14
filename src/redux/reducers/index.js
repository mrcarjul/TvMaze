import {combineReducers} from 'redux';

import shows from './shows';
import themes from './themes';

const rootReducer = combineReducers({
  shows,
  themes,
});

export default rootReducer;
