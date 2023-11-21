import { Datepicker } from 'vanillajs-datepicker';
// import ru from 'vanillajs-datepicker/locales/ru';
import en from 'vanillajs-datepicker/locales/en-GB';
import es from 'vanillajs-datepicker/locales/es';

console.log(es)
window.addEventListener('DOMContentLoaded', (event) => {
	const datepickes = document.querySelectorAll('.b_datepicker .input__field');

	Object.assign(Datepicker.locales, en, es);
	datepickes.forEach(datepicker => {
		const vanillaDatepicker = new Datepicker(datepicker, {
			language: 'en',
			locale: en,
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