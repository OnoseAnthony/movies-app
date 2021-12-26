import axios from 'axios';
import {baseUrl, apiKey} from '../constants';

// function to return popular movies
export const getPopularMovies = async () => {
  const res = await axios.get(`${baseUrl}movie/popular?api_key=${apiKey}`);
  return res.data.results;
};

// function to return popular movies
export const getUpcomingMovies = async () => {
  const res = await axios.get(`${baseUrl}movie/upcoming?api_key=${apiKey}`);
  return res.data.results;
};

// function to return popular Tv Shows
export const getPopularTv = async () => {
  const res = await axios.get(`${baseUrl}tv/popular?api_key=${apiKey}`);
  return res.data.results;
};

// function to return family Tv Shows
export const getFamilyShows = async () => {
  const res = await axios.get(
    `${baseUrl}discover/movie?api_key=${apiKey}&with_genres=10751`,
  );
  return res.data.results;
};

/* function to return details of a single movie */
export const getmovieInfo = async movie_id => {
  const res = await axios.get(`${baseUrl}movie/${movie_id}?api_key=${apiKey}`);
  return res.data;
};

/* function to return youtube id and trailer link of a single movie */
export const getmovieLink = async movie_id => {
  const res = await axios.get(
    `${baseUrl}movie/${movie_id}/videos?api_key=${apiKey}`,
  );
  return `https://www.youtube.com/watch?v=${res.data.results[0].key}`;
};
