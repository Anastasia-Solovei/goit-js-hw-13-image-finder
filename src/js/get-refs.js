export default function getRefs() {
  return {
    searchForm: document.querySelector('#search-form'),
    galleryContainer: document.querySelector('.js-gallery'),
    loadMoreBtn: document.querySelector('button[data-action="load-more"]'),
    scrollElem: document.querySelector('.scroll-elem'),
    // container: document.querySelector('.container'),
  };
}
