import { Datepicker } from 'vanillajs-datepicker';
import * as locales from 'vanillajs-datepicker/locales/ru';

window.addEventListener('DOMContentLoaded', (event) => {
	const datepickes = document.querySelectorAll('.b_datepicker .input__field');

	Object.assign(Datepicker.locales, locales.ru);
	datepickes.forEach(datepicker => {
		const vanillaDatepicker = new Datepicker(datepicker, {
			language: 'ru',
			locale: locales.ru,
			format: 'dd.mm.yyyy',
	    // autohide: true,
		  // keyboardNav: false,
		}); 	

		// calendar.addEventListener('changeDate', () => {
		// 	datepicker.hide();
		// })

	  // calendar.addEventListener("focus", function() {
	  //   this.blur();
		// 	datepicker.hide();
	  // });
	})
});