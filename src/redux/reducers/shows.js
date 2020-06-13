import {
  REQUEST_DATA,
  REQUEST_DATA_FAILURE,
  REQUEST_SHOWS_DATA_SUCCESS,
  REQUEST_SHOWS_EPISODES_DATA_SUCCESS,
} from '../actions/shows';

const initialState = {
  error: null,
  errorMsg: null,
  fetching: null,
  index: null,
  page: 0,
  shows: [],
  episodes: {},
};

export default function shows(state = initialState, action) {
  switch (action.type) {
    case REQUEST_DATA:
      return {
        ...state,
        fetching: true,
        error: null,
        errorMsg: null,
      };
    case REQUEST_DATA_FAILURE:
      return {
        ...state,
        fetching: false,
        error: true,
        errorMsg: action.errorMsg,
      };
    case REQUEST_SHOWS_DATA_SUCCESS:
      return {
        ...state,
        shows: action.payload,
        fetching: false,
        error: null,
        errorMsg: null,
        page: action.page || 0,
      };
    case REQUEST_SHOWS_EPISODES_DATA_SUCCESS:
      return {
        ...state,
        episodes: action.payload,
        fetching: false,
        error: null,
        errorMsg: null,
      };
    default:
      return state;
  }
}
