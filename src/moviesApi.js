import Axios from 'axios';

const API_KEY = '192d58801f8428b3bbb628527ecf44a8';

const myAxios = Axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

const params = {
  original_language: 'en-US',
  adult: false,
  api_key: API_KEY,
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTJkNTg4MDFmODQyOGIzYmJiNjI4NTI3ZWNmNDRhOCIsIm5iZiI6MTczMzQ4MjM3MS4yOTEwMDAxLCJzdWIiOiI2NzUyZDc4MzEyMzRiOTlhOTQ3NDA5ZmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.G5-8Lc3R82GSbDwRV2WmRFHx2XxV0SiVhNLI3RNPels',
  },
};

export async function getMovies() {
  const response = await myAxios.get('/trending/movie/day', { params });
  return response.data;
}

export async function getMovieDetails(movieId) {
  const response = await myAxios.get(`movie/${movieId}`, { params });
  return response.data;
}

export async function getMoviesWithSearch(search) {
  const response = await myAxios.get(`search/movie?${params}&query=${search}`);
  return response.data;
}

export async function getMovieCast(movieId) {
  const response = await myAxios.get(`movie/${movieId}/credits`, { params });
  return response.data;
}

export async function getMovieReviews(movieId) {
  const response = await myAxios.get(`movie/${movieId}/reviews`, { params });
  return response.data;
}
