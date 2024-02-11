import axios, { isCancel, AxiosError } from 'axios';
import { renderPhoto, simpleLightbox, noImages } from './render-functions';
import iziToast from 'izitoast';
import closeIcon from '../img/bi_x-octagon.png';

export default async function getPhotos(inputSearch, page) {
  try {
    const searchParams = new URLSearchParams({
      key: '42209591-dcd9ad54ecaffcfe9e9b64d04',
      q: `${inputSearch}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'false',
      per_page: 15,
      page: page,
    });
    showSpiner();
    const result = await axios.get(`https://pixabay.com/api/?${searchParams}`);
    // const photos = result.json();

    const arrayPhotos = result.data.hits;
    if (arrayPhotos.length === 0) {
      noImages();
    }

    renderPhoto(arrayPhotos);
    hideSpiner();

    simpleLightbox();
  } catch (error) {
    iziToast.error({
      messageColor: '#FFF',
      color: '#EF4040',
      iconUrl: closeIcon,
      position: 'topRight',
      message: `${error}`,
    });
  }
}

export const showSpiner = function () {
  const load = document.querySelector('.load');
  const loaderMore = document.querySelector('.loaderMore');
  load.classList.add('hidden');

  loaderMore.innerHTML = '<span class="loader"></span>';
};

export const hideSpiner = function () {
  const load = document.querySelector('.load');
  const loaderMore = document.querySelector('.loaderMore');

  load.classList.remove('hidden');
  loaderMore.innerHTML = '';
};
