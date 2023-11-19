"use strict"

import Swiper, { Navigation, Autoplay, Pagination, Thumbs, EffectFade, Grid } from "swiper";

let reviews = new Swiper(".reviews-carousel", {
  modules: [Navigation, Pagination, EffectFade],
  pagination: {
    el: ".reviews-pagination",
    clickable: true,
  },
  // effect: 'fade',
  //   fadeEffect: {
  //   crossFade: true
  // },
  navigation: {
    nextEl: ".reviews-button-next",
    prevEl: ".reviews-button-prev",
  },
  slidesPerView: 1.1,
  spaceBetween: 15,
  breakpoints: {
    993: {
      slidesPerView: 2,
      spaceBetween: 30,
    }
  }
}); 

// console.log(reviews)