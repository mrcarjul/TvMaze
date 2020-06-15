import API from '../../services/api';

const {getShowsByPage, getShowsByQuery, getShowEpisodesById} = API;

// default Error Messages
const badResponse = 'Error: There was an Error in API response';
const networkError =
  'Error: Could not retrive shows info for the moment, please try again later.';

/**
 * @description Types
 */
export const REQUEST_DATA = 'REQUEST_DATA';
export const REQUEST_DATA_FAILURE = 'REQUEST_DATA_FAILURE';
export const REQUEST_SHOWS_DATA_SUCCESS = 'REQUEST_SHOWS_DATA_SUCCESS';
export const REQUEST_SHOWS_EPISODES_DATA_SUCCESS =
  'REQUEST_SHOWS_EPISODES_DATA_SUCCESS';
export const SET_EPISODE_ID = 'SET_EPISODE_ID';
export const SET_SHOW_ID = 'SET_SHOW_ID';

export const requestData = () => ({type: REQUEST_DATA});
export const requestDataFailure = errorMsg => ({
  type: REQUEST_DATA_FAILURE,
  errorMsg,
});
export const requestShowsDataSuccess = (payload, page) => ({
  type: REQUEST_SHOWS_DATA_SUCCESS,
  payload,
  page,
});
export const requestShowsEpisodesDataSuccess = payload => ({
  type: REQUEST_SHOWS_EPISODES_DATA_SUCCESS,
  payload,
});
export const setShowIdAction = show_id => ({
  type: SET_SHOW_ID,
  show_id,
});
export const setEpisodeIdAction = episode_id => ({
  type: SET_EPISODE_ID,
  episode_id,
});

/**
 * @description Checks sample off api response to review if is as expected
 * @param {object} payload containing api response
 */
const validateApiResponse = payload => {
  const {id, name, url, genres, premiered, rating, image, summary} =
    payload || {};
  if (id && name && url && genres && premiered && rating && image && summary) {
    return false;
  }
  return true;
};

/**
 * @description Calls api to retrieve shows questions
 */
export const getShowsByPageAction = page => async dispatch => {
  try {
    dispatch(requestData());
    const response = await getShowsByPage(page);
    if (response?.data) {
      const showsPayload = response.data;
      const samplePayload = showsPayload?.length ? showsPayload[0] : {};
      if (validateApiResponse(samplePayload) && !showsPayload?.length === 0) {
        dispatch(requestDataFailure(badResponse));
      }
      dispatch(requestShowsDataSuccess(showsPayload, page));
    } else {
      dispatch(requestDataFailure(badResponse));
    }
  } catch (error) {
    dispatch(requestDataFailure(networkError));
  }
};

/**
 * @description Calls api to retrieve shows questions by given query string
 */
export const getShowsByQueryAction = query => async dispatch => {
  try {
    dispatch(requestData());
    const response = await getShowsByQuery(query);
    if (response?.data) {
      const showsPayload = response.data;
      const samplePayload = showsPayload?.length ? showsPayload[0]?.show : {};
      if (validateApiResponse(samplePayload) && !showsPayload?.length === 0) {
        dispatch(requestDataFailure(badResponse));
        return;
      }
      dispatch(
        requestShowsDataSuccess(showsPayload.map(showData => showData.show)),
      );
    } else {
      dispatch(requestDataFailure(badResponse));
    }
  } catch (error) {
    dispatch(requestDataFailure(networkError));
  }
};

/**
 * @description Calls api to retrieve shows questions
 */
export const getShowEpisodesByIdAction = id => async dispatch => {
  try {
    dispatch(requestData());
    const response = await getShowEpisodesById(id);
    if (response?.data) {
      const episodesPayload = response.data; // Only get the data to used
      dispatch(requestShowsEpisodesDataSuccess(episodesPayload));
    } else {
      dispatch(requestDataFailure(badResponse));
    }
  } catch (error) {
    dispatch(requestDataFailure(networkError));
  }
};
