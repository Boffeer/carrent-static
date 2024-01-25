import {getNumberDate, getDatesRange} from "../helpers.b/dates-helpers.js";
import {getMaxDaysFromString} from "../helpers.b/get-helpers.js";

window.addEventListener("DOMContentLoaded", (event) => {

  const productHero = document.querySelector('.product-hero');
  if (!productHero) return;

  function updateFlatpickrValue(input, flatpickrInput, index) {
      if (!flatpickrInput._flatpickr) {
        setTimeout(() => {
          updateFlatpickrValue(input, flatpickrInput, index)
        }, 300);
        return;
      }

      if (flatpickrInput._flatpickr.selectedDates[index]) {
        input.value = getNumberDate(flatpickrInput._flatpickr.selectedDates[index]);
      } else {
        input.value = '';
      }
  }

  function setTimepickerValues(bookForm) {
    if (!bookForm) return;

    const url = window.location.href;
    const decodedUrl = decodeURIComponent(url);
    const urlSearchParams = new URLSearchParams(decodedUrl.split('?')[1]);

    const flatpickr = bookForm.querySelector('.product-hero__calendar .input__field');


    bookForm.querySelector('[name="cancel_page"]').value = window.location.href;


    let dateStart = '';
    let timeStart = '';
    const searchStart = urlSearchParams.get('date_start');
    if (searchStart) {
      [dateStart, timeStart] = searchStart.split(' ');
      const inputDateStart = document.querySelector('.product-hero__calendar input[name="date_start"]');
      inputDateStart.value = dateStart

      updateFlatpickrValue(inputDateStart, flatpickr, 0)

      const inputTimeStart = document.querySelector('input[name="time_start"]');
      inputTimeStart.value = timeStart;
      inputTimeStart.updateHandler()
      changeTimepickerValue(inputTimeStart, timeStart);
    }

    let dateEnd = '';
    let timeEnd = '';
    const searchEnd = urlSearchParams.get('date_end');
    if (searchEnd) {
      [dateEnd, timeEnd] = searchEnd.split(' ');
      const inputDateEnd = document.querySelector('.product-hero__calendar input[name="date_end"]');
      inputDateEnd.value = dateEnd

      updateFlatpickrValue(inputDateEnd, flatpickr, 1);


      const inputTimeEnd = document.querySelector('input[name="time_end"]');
      inputTimeEnd.value = timeEnd;
      inputTimeEnd.updateHandler()
      changeTimepickerValue(inputTimeEnd, timeEnd);
    }

    function changeTimepickerValue(timepickerInput, timeValue) {
      if (!timepickerInput.inputmask) {
        setTimeout(() => {
          changeTimepickerValue(timepickerInput, timeValue)
        }, 100)
        return;
      }
      if (!timepickerInput.inputmask.isComplete) {
        setTimeout(() => {
          changeTimepickerValue(timepickerInput, timeValue)
        }, 100)
        return;
      }
      timepickerInput.inputmask._valueSet(timeValue);
    }

    const locationStart = urlSearchParams.get('location_start');
    if (locationStart) {
      const locationStartSelect = bookForm.querySelector('[name="location_start"]');
      if (!locationStartSelect) return;

      const select = locationStartSelect.closest('.select')
      const option = [...select.querySelectorAll('option')].find(option => {
        return option.value === locationStart
      });

      select.selectOption(option);
    }

    const flightNumber = urlSearchParams.get('flight_number');
    if (flightNumber) {
      const flightNumberInput = bookForm.querySelector('[name="flight_number"]');
      flightNumberInput.value = flightNumber;
    }
  }

  const bookForm = document.querySelector('.product-hero__bookform')
  setTimepickerValues(bookForm)
  bookForm?.addEventListener('submit-success', (e) => {
    const result = JSON.parse(e.detail.result);

    window.location.href = result.paylink
  })

  const DATE_EMPTY = 'NaN-NaN-NaN';
  const dateStart = document.querySelector('.product-hero__bookform input[name="date_start"]');
  const dateEnd = document.querySelector('.product-hero__bookform input[name="date_end"]');
  const timeStart = document.querySelector('.product-hero__bookform input[name="time_start"]');
  const timeEnd = document.querySelector('.product-hero__bookform input[name="time_end"]');

  function countSelectedDates() {
    if (dateEnd === DATE_EMPTY) return;
    const start = `${dateStart.value} ${timeStart.value}`
    const end = `${dateEnd.value} ${timeEnd.value}`
    const days = getDatesRange(start, end)
    if (typeof days[0] === 'string') return 0;
    return days.length - 2
  }

  function isNumberInRange(number, a, b) {
    return number >= a && number <= b;
  }

  function getTotalPrice() {
    const selectedDaysCount = countSelectedDates() || 1;
    let totalPrice = 0;

    const options = document.querySelectorAll('.product-hero__bookform input[name="options"]');
    options.forEach(option => {
      option = option.closest('.checkbox');
      let pills = [...option.querySelectorAll('.checkbox__pill')];
      pills = pills.filter(pill => {
        pill.classList.add('is-opaque')
        const daysIn = getMaxDaysFromString(pill.dataset.range)
        if (typeof daysIn === 'number') {
          return selectedDaysCount > daysIn;
        } else {
          return isNumberInRange(selectedDaysCount, ...daysIn) || selectedDaysCount >= daysIn[1];
        }
      })
      let currentOption;
      if (pills.length === 0) {
        currentOption = option.querySelector('.checkbox__pill')

      } else {
        currentOption = pills[pills.length - 1]
      }
      currentOption.classList.remove('is-opaque');
      const input = option.querySelector('input');
      if (input.checked) {
        const currentOptionPrice = currentOption.querySelector('.checkbox__pill-head span').innerText
        totalPrice += +currentOptionPrice
      }

    })

    let rates = [...document.querySelectorAll('.product-hero__bookform-tariff')]
    rates = rates.filter(rate => {
      rate.classList.add('is-opaque')
      const daysIn = getMaxDaysFromString(rate.dataset.range)
      if (typeof daysIn === 'number') {
        return selectedDaysCount > daysIn;
      } else {
        return isNumberInRange(selectedDaysCount, ...daysIn) || selectedDaysCount >= daysIn[1];
      }
    });
    let currentRate
    if (rates.length === 0) {
      currentRate = document.querySelector('.product-hero__bookform-tariff')
    } else {
      currentRate = rates[rates.length - 1];
    }
    currentRate.classList.remove('is-opaque');
    const currentRatePrice = currentRate.querySelector('.product-hero__bookform-tariff-price span').innerText
    totalPrice+= +currentRatePrice

    return totalPrice * selectedDaysCount
  }

  function setBookButtonPrice() {
    const button = document.querySelector('.product-hero__bookform-submit')
    if (!button.dataset.initialText) {
      button.dataset.initialText = button.innerText;
    }

    const totalPrice = getTotalPrice()

    button.innerText = `${button.dataset.initialText} (${totalPrice}${button.dataset.currency})`
  }

  if (dateEnd) {
    dateEnd.addEventListener('input', () => {
      setBookButtonPrice()
    });
  }

  const options = document.querySelectorAll('.product-hero__bookform input[name="options"]');
  options.forEach(option => {
    option.addEventListener('input', () => {
      setBookButtonPrice()
    })
  })

  setBookButtonPrice();

});
