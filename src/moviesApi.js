import Axios from 'axios';

//const API_KEY = '192d58801f8428b3bbb628527ecf44a8';

const myAxios = Axios.create({
  baseUrl: 'https://api.themoviedb.org/3',
});

export default async function getMovies() {
  const params = {
    original_language: 'es',
    adult: false,
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTJkNTg4MDFmODQyOGIzYmJiNjI4NTI3ZWNmNDRhOCIsIm5iZiI6MTczMzQ4MjM3MS4yOTEwMDAxLCJzdWIiOiI2NzUyZDc4MzEyMzRiOTlhOTQ3NDA5ZmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.G5-8Lc3R82GSbDwRV2WmRFHx2XxV0SiVhNLI3RNPels',
    },
  };
  const response = await myAxios.get('/trending/movie/day', { params });
  return response.data;
}
