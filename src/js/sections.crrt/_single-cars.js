import {getNumberDate} from "../helpers.b/dates-helpers.js";

window.addEventListener("DOMContentLoaded", (event) => {

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
});
