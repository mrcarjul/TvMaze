import axios from 'axios';

const API_URL = 'https://api.tvmaze.com';

/**
 * @description Creates an Axios Instance
 * @param baseURL Default api uri used if not given
 */
const create = (baseURL = API_URL) => {
  const api = axios.create({
    baseURL,
    timeout: 25000,
  });

  /**
   * @description Requests Shows by Page
   * @param {number} page
   */
  const getShowsByPage = (page = 0) => api.get(`/shows?page=${page}`);

  /**
   * @description Requests Shows by Query String
   * @param {query} query
   */
  const getShowsByQuery = query => api.get(`/shows?q=${query}`);

  /**
   * @description Requests Shows Episodes information by Show Id
   * @param {number} show_id
   */
  const getShowEpisodesById = show_id => api.get(`/shows/${show_id}/episodes`);

  return {
    getShowsByPage,
    getShowsByQuery,
    getShowEpisodesById,
  };
};

const API = create();

export default API;
