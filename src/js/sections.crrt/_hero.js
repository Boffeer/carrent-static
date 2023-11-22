import Swiper, { Navigation, Pagination, EffectCreative } from "swiper";

window.addEventListener('DOMContentLoaded', (event) => {
	const hero = document.querySelector('.hero');

	if (!hero) return;


	const swiperConfig = {
		speed: 450,
		slidesPerView: 1,
		modules: [Navigation, Pagination, EffectCreative],
		spaceBetween: 10,
		effect: "creative",
		creativeEffect: {
			prev: {
				shadow: true,
				translate: ["-20%", 0, -1],
				opacity: 0,
			},
			next: {
				translate: ["130%", 0, 0],
			},
		},

		navigation: {
			nextEl: ".hero-gallery__button-next",
			prevEl: ".hero-gallery__button-prev",
		},

		lazy: {
		    loadPrevNext: true, // pre-loads the next image to avoid showing a loading placeholder if possible
		    loadPrevNextAmount: 2 //or, if you wish, preload the next 2 images
		},
	}
	// console.log(swiperConfig)

	let heroGallerySwiper = new Swiper('.hero-gallery__swiper', swiperConfig);
	// console.log(heroGallerySwiper)

});