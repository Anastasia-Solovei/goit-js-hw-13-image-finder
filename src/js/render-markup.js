import getRefs from './get-refs.js';
import API from './apiService';
import galleryImgTpl from '../templates/gallery-img.hbs';
// import modalImgTpl from '../templates/modal-img.hbs';

import * as basicLightbox from 'basiclightbox';
import * as PNotify from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/BrightTheme.css';

PNotify.defaultModules.set(PNotifyMobile, {});
PNotify.defaults.delay = 2500;

const refs = getRefs();
const imgsApiService = new API();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', fetchGalleryImages);

function onSearch(e) {
  e.preventDefault();

  imgsApiService.query = e.currentTarget.elements.query.value;

  if (imgsApiService.searchQuery === '') {
    onFetchError();
    return;
  }

  imgsApiService.resetPage();
  clearGalleryContainer();
  fetchGalleryImages();
}

function fetchGalleryImages() {
  if (imgsApiService.searchQuery === '') {
    onFetchError();
    return;
  }

  refs.loadMoreBtn.disabled = true;

  imgsApiService.fetchImages().then(hits => {
    appendImgsMarkup(hits);
    refs.loadMoreBtn.disabled = false;
  });
}

function appendImgsMarkup(hits) {
  if (hits.length === 0) {
    PNotify.error({
      text: 'Oops! Nothing is found! Try another query!',
    });
  }

  if (hits.length < 12) {
    refs.loadMoreBtn.classList.add('is-hidden');
  }

  refs.galleryContainer.insertAdjacentHTML('beforeend', galleryImgTpl(hits));

  // if (hits.length !== 0) {
  //   const galleryImg = document.querySelector('.gallery__img');
  //   console.log(galleryImg);
  //   galleryImg.addEventListener('click', onGalleryImgClick);
  // }

  smoothScrolling();
}

function clearGalleryContainer() {
  refs.galleryContainer.innerHTML = '';
}

function smoothScrolling() {
  refs.scrollElem.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}

function onFetchError() {
  PNotify.error({
    text: 'Please enter your query!',
  });
}
