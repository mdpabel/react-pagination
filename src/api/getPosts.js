import axios from 'axios';

async function fetchPhotos(currentPage, pageSize) {
  const url = `https://jsonplaceholder.typicode.com/photos?_page=${currentPage}&_limit=${pageSize}`;
  const { data } = await axios.get(url);

  return data;
}

export { fetchPhotos };
