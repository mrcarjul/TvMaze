import {
  REQUEST_DATA,
  REQUEST_DATA_FAILURE,
  REQUEST_SHOWS_DATA_SUCCESS,
  REQUEST_SHOWS_EPISODES_DATA_SUCCESS,
  SET_EPISODE_ID,
  SET_SHOW_ID,
} from '../actions/shows';

const initialState = {
  error: null,
  errorMsg: null,
  fetching: null,
  episode_id: null,
  show_id: null,
  page: 0,
  searchByQuery: false,
  shows: [],
  episodes: [],
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
        shows:
          action.page > state.page
            ? [...state.shows, ...action.payload]
            : action.payload,
        fetching: false,
        error: null,
        errorMsg: null,
        page: action.page || 0,
        searchByQuery: typeof action.page === 'number' ? false : true,
      };
    case REQUEST_SHOWS_EPISODES_DATA_SUCCESS:
      return {
        ...state,
        episodes: action.payload,
        fetching: false,
        error: null,
        errorMsg: null,
      };
    case SET_EPISODE_ID:
      return {
        ...state,
        episode_id: action.episode_id,
      };
    case SET_SHOW_ID:
      return {
        ...state,
        show_id: action.show_id,
      };
    default:
      return state;
  }
}
