"use strict";

// Важно подключить первым, чтобы все быстрее отработало
import "./helpers.b/_quickfix.js"

import "./libs/masonry.pkgd.min.js";

import "./components.b/groupers/_bayan.js";
import "./components.b/controls/_select.js";

import "./components.crrt/_datepicker.js";
import "./components.crrt/_timepicker.js";

import "./components.b/header/header.js";
import "./components.b/controls/formich.js";
// import "./components.b/spawners/b_modal.js";
import "./components.b/spawners/_b_video.js";
// import "./components.b/controls/_button-sticky.js";
import "./components.b/lego/wysiwyg.js";

// import "./components.b/controls/b_tabs.js";

// import "./components.sklh/_price-table.js";
// import "./components.sklh/_quiz.js";
// import "./components.sklh/_review-card.js";

// import "./components.sklh/_blinds-carousel.js";

// import "./sections.sklh/_portfolio-gallery.js";
// import "./sections.sklh/_problems.js";
// import "./sections.sklh/_team.js";

// import "./sections.sklh/_content-reviews.js";
// import "./sections.sklh/_content-reviews.js";

import "./sections.crrt/_hero.js";

import "./sections.bh/_reviews.js";

import "./sections.mdn/_blog.js";
import "./sections.mdn/_product-hero.js";

window.media = {
	tablet: 991,
}

window.addEventListener('DOMContentLoaded', (event) => {

  const searchForm = document.querySelector('.hero__bookform');

  function getCarCard(car) {
    const card = document.createElement('article');
    card.classList.add('js_created', 'car-card');
    card.dataset.id = car.id;

    let carHtml = `
        <div class="car-card__media">
            <picture class="car-card__media-pic">
                <img class="car-card__media-img" src="${car.thumb}" alt="${car.title}">
            </picture>
        </div>
        <div class="car-card__body">
            <header class="car-card__header">
                <h3 class="car-card__title">
                    <a href="${car.url}" class="car-card__link">${car.title}</a>
                </h3>
                <div class="car-card__header-info">
            <span class="car-card__price">
              <span>${car.price_cheap}</span>
              <span class="currency">${car.currency}</span>
            </span>
            <span class="car-card__caption">${car.text_price_hint}</span>
                </div>
            </header>
            <div class="car-card__bullets">
      `;

      if (car.fuel && car.fuel != 0) {
      carHtml += `
                <div class="car-card-bullet">
                    <div class="car-card-bullet__media">
                        <picture class="car-card-bullet__media-pic">
                            <img class="car-card-bullet__media-img" src="${window.m_ajax.static}/img/common.crrt/icon-fuel.svg" alt="">
                        </picture>
                    </div>
                    <p class="card-card-bullet__caption">${car.fuel}</p>
                </div>
                `;
      }
      if (car.number_seats && car.number_seats != 0) {
      carHtml += `
                <div class="car-card-bullet">
                    <div class="car-card-bullet__media">
                        <picture class="car-card-bullet__media-pic">
                            <img class="car-card-bullet__media-img" src="${window.m_ajax.static}/img/common.crrt/icon-capacity.svg" alt="">
                        </picture>
                    </div>
                    <p class="card-card-bullet__caption">${car.number_seats}</p>
                </div>
                `;
      }

      if (car.trunk_volume && car.trunk_volume != 0) {
      carHtml += `
                <div class="car-card-bullet">
                    <div class="car-card-bullet__media">
                        <picture class="car-card-bullet__media-pic">
                            <img class="car-card-bullet__media-img" src="${window.m_ajax.static}/img/common.crrt/icon-volume.svg" alt="">
                        </picture>
                    </div>
                    <p class="card-card-bullet__caption">${car.trunk_volume}</p>
                </div>
                `;
      }
      if (car.transmission && car.transmission != 0) {
      carHtml += `
                <div class="car-card-bullet">
                    <div class="car-card-bullet__media">
                        <picture class="car-card-bullet__media-pic">
                            <img class="car-card-bullet__media-img" src="${window.m_ajax.static}/img/common.crrt/icon-transmission.svg" alt="">
                        </picture>
                    </div>
                    <p class="card-card-bullet__caption">${car.transmission}</p>
                </div>
                `;
      }

      carHtml += `
            </div>
        </div>
        <div class="car-card__body">
            <a href="${car.url}" class="button-primary car-card__button">${car.text_book}</a>
        </div>
    `;
    card.innerHTML = carHtml;

    return card;
  }

  const carsShelf = document.querySelector('#cars .shelf__content')
  searchForm.addEventListener('submit-success', (e) => {
    const result = JSON.parse(e.detail.result);
    carsShelf.innerHTML = '';

    result.cars.forEach(car => {
      const card = getCarCard(car);
      carsShelf.append(card)
    })
  })
});
