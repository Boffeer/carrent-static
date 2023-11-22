"use strict"

import Swiper, { Navigation, Autoplay, Pagination, Scrollbar, Thumbs, EffectFade, Grid } from "swiper";

let reviews = new Swiper(".reviews-carousel__swiper", {
  modules: [Navigation, Pagination, EffectFade, Scrollbar],
  // pagination: {
  //   el: ".reviews-pagination",
  //   clickable: true,
  // },
  // effect: 'fade',
  //   fadeEffect: {
  //   crossFade: true
  // },
  navigation: {
    nextEl: ".reviews-carousel__button-next",
    prevEl: ".reviews-carousel__button-prev",
  },
  scrollbar: {
      el: ".reviews-carousel__scrollbar",
  },
  slidesPerView: 1,
  // slidesPerView: 1.1,
  spaceBetween: 20,
  breakpoints: {
    992: {
      slidesPerView: 2,
      spaceBetween: 30,
    }
  }
}); 

// console.log(reviews)