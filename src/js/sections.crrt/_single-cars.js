window.addEventListener("DOMContentLoaded", async (event) => {
  let searchStart = window.localStorage.getItem('search_start');
  let searchEnd = window.localStorage.getItem('search_end');


  let dateSart = '';
  let timeSart = '';
  if (searchStart) {
    [dateSart, timeSart] = searchStart.split(' ');
  }

  let dateEnd = '';
  let timeEnd = '';
  if (searchEnd) {
    [dateEnd, timeEnd] = searchStart.split(' ');
  }

  setTimeout(() => {
    const inputTimeStart = document.querySelector('input[name="time_start"]');
    const inputTimeEnd = document.querySelector('input[name="time_end"]');

    if (!inputTimeStart || !inputTimeEnd) return;

    inputTimeStart.value = timeSart;
    inputTimeEnd.value = timeSart;

    inputTimeStart.updateHandler()
    inputTimeEnd.updateHandler()

    inputTimeStart.inputmask._setValue(timeSart);
    inputTimeEnd.inputmask._setValue(timeEnd);

  }, 500)

  async function getBooking() {
    const formData = new FormData;
    formData.append('action', 'get_car_bookings');
    formData.append('id', document.querySelector('.product-hero').dataset.id);

    const request = await fetch(window.m_ajax.url, {
      method: 'POST',
      body: formData,
    })
    const response = await request.json();
    console.log(response)
  }
  getBooking();


  // let activeBooksings = response.active_bookings.map.map(book => {
  //   return {
  //     start: book.start_date,
  //     end: book.end_date,
  //   }
  // })
  async function getStripe() {
    const stripeFormData = new FormData;
    stripeFormData.append('action', 'get_stripe_paylink');
    stripeFormData.append('post_id', document.querySelector('.product-hero').dataset.id);
    stripeFormData.append('date_start', window.localStorage.getItem('search_start'));
    stripeFormData.append('date_end', window.localStorage.getItem('search_end'));

    const request = await fetch(window.m_ajax.url, {
      method: 'POST',
      body: stripeFormData,
    })
    const response = await request.json();

    document.querySelector('.product-hero__bookform-button').href = response.paylink;
    console.log(response)
  }

  getStripe();


  const bookForm = document.querySelector('.product-hero__bookform')
  bookForm?.addEventListener('submit-success', (e) => {
    const result = JSON.parse(e.detail.result);

    window.location.href = result.paylink
  })
});
