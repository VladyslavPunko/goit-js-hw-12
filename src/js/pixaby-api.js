import axios, { isCancel, AxiosError } from 'axios';
import { renderPhoto, simpleLightbox, noImages } from './render-functions';
import iziToast from 'izitoast';
import closeIcon from '../img/bi_x-octagon.png';

export default async function getPhotos(inputSearch, page) {
  const limit = 15;
  const load = document.querySelector('.load-more');
  try {
    const searchParams = new URLSearchParams({
      key: '42209591-dcd9ad54ecaffcfe9e9b64d04',
      q: `${inputSearch}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'false',
      per_page: limit,
      page: page,
    });
    showSpiner();
    const result = await axios.get(`https://pixabay.com/api/?${searchParams}`);

    const arrayPhotos = result.data.hits;
    const totalHits = result.data.totalHits;
    const totalPages = Math.ceil(totalHits / limit);

    if (arrayPhotos.length === 0) {
      noImages();
    }

    renderPhoto(arrayPhotos);
    hideSpiner();

    if (arrayPhotos.length !== 0) {
      const load = document.querySelector('.load');
      load.classList.remove('hidden');
    }

    if (arrayPhotos.length < 15) {
      const load = document.querySelector('.load');
      load.classList.add('hidden');
    }

    simpleLightbox();
    return totalPages;
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
  const loaderMore = document.querySelector('.loaderMore');

  loaderMore.innerHTML = '<span class="loader"></span>';

  const load = document.querySelector('.load');
  load.classList.add('hidden');
};

export const hideSpiner = function () {
  const load = document.querySelector('.load');
  const loaderMore = document.querySelector('.loaderMore');

  loaderMore.innerHTML = '';
};
