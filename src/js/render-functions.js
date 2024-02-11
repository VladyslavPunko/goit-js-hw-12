import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import closeIcon from '../img/bi_x-octagon.png';
import SimpleLightbox from 'simplelightbox';

export const renderPhoto = function (photos) {
  const markup = photos
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class='gallery-item'>
    <a class='gallery-link' href='${largeImageURL}'>
      <img class='gallery-image' src='${webformatURL}' alt='${tags}'/>
    </a>
  <div class='container-app'>
  <p><span>Likes</span> ${likes}</p>
  <p><span>Views</span> ${views}</p>
  <p><span>Comments</span> ${comments}</p>
  <p><span>Downloads</span> ${downloads}</p>
  </div>
   </li>`
    )
    .join('');
  const list = document.querySelector('.gallery');
  list.innerHTML += markup;
};

export const simpleLightbox = function () {
  let gallery = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionsPosition: 'bottom',
    captionDelay: 250,
  });
  gallery.on('show.simpleLightbox');
  gallery.refresh();
};

export const noImages = function () {
  iziToast.error({
    messageColor: '#FFF',
    color: '#EF4040',
    iconUrl: closeIcon,
    position: 'topRight',
    message:
      'Sorry, there are no images matching your search query. Please try again!',
  });
};
