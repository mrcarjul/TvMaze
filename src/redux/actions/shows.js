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

/**
 * @description Checks if api response is as expected
 * @param {object} payload containing api response
 */
const validateApiResponse = payload => {
  const {id, name, url, genres, premiered, rating, image, summary} = payload;
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
    debugger;
    if (response?.data) {
      const showsPayload = response.data;
      if (validateApiResponse(showsPayload)) {
        dispatch(
          requestDataFailure(
            'Could not Retrive Shows Info for the moment, please try again later',
          ),
        );
      }
      dispatch(requestShowsDataSuccess(showsPayload, page + 1));
    } else {
      dispatch(requestDataFailure('Error: There was an Error in API response'));
    }
  } catch (error) {
    dispatch(
      requestDataFailure(
        'Error: Could not retrive shows info for the moment, please try again later.',
      ),
    );
  }
};

/**
 * @description Calls api to retrieve shows questions
 */
export const getShowsByQueryAction = query => async dispatch => {
  try {
    dispatch(requestData());
    const response = await getShowsByQuery(query);
    debugger;
    if (response?.data) {
      const showsPayload = response.data;
      if (validateApiResponse(showsPayload)) {
        dispatch(requestDataFailure(badResponse));
        return;
      }
      dispatch(requestShowsDataSuccess(showsPayload));
    } else {
      dispatch(requestDataFailure(badResponse));
    }
  } catch (error) {
    dispatch(requestDataFailure(networkError));
  }
  ƒ;
};

/**
 * @description Calls api to retrieve shows questions
 */
export const getShowEpisodesByIdAction = id => async dispatch => {
  try {
    dispatch(requestData());
    const response = await getShowEpisodesById(id);
    debugger;
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
