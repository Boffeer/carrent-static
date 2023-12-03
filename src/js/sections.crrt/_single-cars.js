window.addEventListener("DOMContentLoaded", (event) => {

  function setTimepickerValues(bookForm) {
    if (!bookForm) return;

    const url = window.location.href;
    const decodedUrl = decodeURIComponent(url);
    const urlSearchParams = new URLSearchParams(decodedUrl.split('?')[1]);

    const searchStart = urlSearchParams.get('date_start');
    const searchEnd = urlSearchParams.get('date_end');


    let dateStart = '';
    let timeStart = '';
    if (searchStart) {
      [dateSart, timeStart] = searchStart.split(' ');
    }

    let dateEnd = '';
    let timeEnd = '';
    if (searchEnd) {
      [dateEnd, timeEnd] = searchEnd.split(' ');
    }

    const inputTimeStart = document.querySelector('input[name="time_start"]');
    const inputTimeEnd = document.querySelector('input[name="time_end"]');

    if (!inputTimeStart || !inputTimeEnd) return;

    inputTimeStart.value = timeStart;
    inputTimeEnd.value = timeEnd;

    inputTimeStart.updateHandler()
    inputTimeEnd.updateHandler()

    changeTimepickerValue();

    function changeTimepickerValue() {
      if (!inputTimeStart.inputmask && !inputTimeEnd.inputmask) {
        setTimeout(() => {
          changeTimepickerValue()
        }, 100)
        return;
      }
      if (!inputTimeStart.inputmask.isComplete && !inputTimeEnd.inputmask.isComplete) {
        setTimeout(() => {
          changeTimepickerValue()
        }, 100)
        return;
      }
      inputTimeStart.inputmask._valueSet(timeSart);
      inputTimeEnd.inputmask._valueSet(timeEnd);
    }
  }

  const bookForm = document.querySelector('.product-hero__bookform')
  setTimepickerValues(bookForm)
  bookForm?.addEventListener('submit-success', (e) => {
    const result = JSON.parse(e.detail.result);

    window.location.href = result.paylink
  })
});
