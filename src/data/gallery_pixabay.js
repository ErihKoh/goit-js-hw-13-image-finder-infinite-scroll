
import galleryImagesTpl from '../templates/gallery_image.hbs';
import ImageApiServise from './api-servise';
import refs from './refs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core';
import { defaults } from '@pnotify/core';

defaults.delay = 2000;

const imageApiService = new ImageApiServise();

refs.searchForm.addEventListener('submit', onSearch);
refs.gallery.addEventListener('click', onImageclick);

function onImageclick(e) {
    e.preventDefault();
    
    if (e.target.nodeName !== 'IMG') {
        return;
    }
    const largeImage = e.target.dataset.source;
    // console.log(largeImage);
    const instance = basicLightbox.create(`<img src="${largeImage}" alt="image"  />`);

    instance.show();
}
    
function onSearch(e) {
    e.preventDefault();
    imageApiService.query = e.currentTarget.elements.query.value;

    if (imageApiService.query === '') {

        clearImageMarkup();
      
        return error({
            title: "Error",
            text: "Please enter query!"
        });
    }
    
    imageApiService.resetPage();
    clearImageMarkup();
    fetchData();
}

async function fetchData() {

    try {
        const { hits } = await imageApiService.fetchImage();
       
          if (hits.length === 0) {
            
            clearImageMarkup();

            return error({
              
                title: "Error",
                text: "Image not found! Repeat query!"
        });
    }
        appendImagesMarkup(hits);
  
    } catch (error) {
        console.log('ошибка в fetchData', error);
    }
    
     imageApiService.incrementPage();
}

function appendImagesMarkup(hits) {
    let movePage = refs.gallery.offsetHeight;
    refs.gallery.insertAdjacentHTML('beforeend', galleryImagesTpl(hits));

    window.scrollTo({

      top: movePage,
      behavior: "smooth",
      
  });
}

function clearImageMarkup() {
    refs.gallery.innerHTML = '';
}

