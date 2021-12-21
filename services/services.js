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

// function to return popular movies
export const getPopularTv = async () => {
  const res = await axios.get(`${baseUrl}tv/popular?api_key=${apiKey}`);
  return res.data.results;
};
