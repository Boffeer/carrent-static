import { Datepicker, DateRangePicker } from 'vanillajs-datepicker';
import ru from 'vanillajs-datepicker/locales/ru';
import en from 'vanillajs-datepicker/locales/en-GB';
import es from 'vanillajs-datepicker/locales/es';

window.addEventListener('DOMContentLoaded', (event) => {
	const datepickers = document.querySelectorAll('.b_datepicker');
	const rangepickers = document.querySelectorAll('.b_rangepicker');

	Object.assign(Datepicker.locales, en, es, ru);

	const locales = {
		'en': en,
		'es': es,
		'ru': ru,
	}

	const CLASSES = {
		rangeInit: 'js_rangepicker-init',
	}

	rangepickers.forEach(rangepicker => {
		const pickerLang = rangepicker.parentElement.getAttribute('data-lang') || 'en';
		const today = new Date().getTime();

		let rangepickerConfig = {
			todayHighlight: true,
			language: pickerLang,
			locale: locales[pickerLang],
			minDate: today,
		}

		const isMobile = () => (window.innerWidth <= window.media.tablet)

		const vanillaRangepicker = new DateRangePicker(rangepicker, rangepickerConfig)

		const datePickerFrom = vanillaRangepicker.inputs[0] 

		datePickerFrom.addEventListener('show', () => {
			if (isMobile()) return
			vanillaRangepicker.datepickers[1].show();
		})
		datePickerFrom.addEventListener('changeDate', () => {
			setTimeout(() => {
				if (isMobile()) {
					vanillaRangepicker.datepickers[0].hide();
				}
				vanillaRangepicker.datepickers[1].show();
			})
		})
		datePickerFrom.addEventListener('changeYear', () => {
			if (window.innerWidth <= window.media.tablet) return
			setTimeout(() => {
				vanillaRangepicker.datepickers[1].show();
			})
		})
		datePickerFrom.addEventListener('changeView', () => {
			if (window.innerWidth <= window.media.tablet) return
			setTimeout(() => {
				vanillaRangepicker.datepickers[1].show();
			})
		})
		datePickerFrom.addEventListener('changeMonth', () => {
			if (window.innerWidth <= window.media.tablet) return
			setTimeout(() => {
				vanillaRangepicker.datepickers[1].show();
			})
		})
		datePickerFrom.addEventListener('changeDate', () => {
			if (window.innerWidth <= window.media.tablet) return
			setTimeout(() => {
				vanillaRangepicker.datepickers[1].show();
			})
		})

		const datePickerTo = vanillaRangepicker.inputs[1]
		datePickerTo.addEventListener('show', (e) => {
			console.log(window.innerWidth< window.media.tablet)
			if (window.innerWidth <= window.media.tablet) return
			vanillaRangepicker.datepickers[0].show()
		})
		datePickerTo.addEventListener('changeYear', () => {
			if (window.innerWidth <= window.media.tablet) return
			setTimeout(() => {
				vanillaRangepicker.datepickers[0].show();
			})
		})
		datePickerTo.addEventListener('changeView', () => {
			if (window.innerWidth <= window.media.tablet) return
			setTimeout(() => {
				vanillaRangepicker.datepickers[0].show();
			})
		})
		datePickerTo.addEventListener('changeDate', () => {
			setTimeout(() => {
				vanillaRangepicker.datepickers[1].hide();
			})
		})

		rangepicker.classList.add(CLASSES.rangeInite)
	});


		datepickers.forEach(datepicker => {
			const rangepicker = datepicker.closest('.b_rangepicker');
			if (rangepicker) {
				if(rangepicker.classList.contains(CLASSES.rangeInite)) return;
			}

			const pickerLang = datepicker.getAttribute('data-lang') || 'en';
			const today = new Date().getTime();

			let datepickerInput = datepicker.querySelector('.input__field');
			if (datepicker.classList.contains('b_datepicker--calendar')) {
				datepickerInput = datepicker;
			}
			const vanillaDatepicker = new Datepicker(datepickerInput, {
				todayHighlight: true,
				language: pickerLang,
				locale: locales[pickerLang],
				defaultViewDate: today,
				minDate: today,
				// format: 'dd.mm.yyyy',

				/*
				format: {
			        toValue(date, format, locale) {
			            let dateObject;
			            //...your custom parse logic
			            return dateObject;
			        },
			        toDisplay(date, format, locale) {
			            let dateString;
			            //...your custom format logic
			            return dateString;
			        },
			    },
			    */
			}); 	
			// console.log(vanillaDatepicker.setDate(today))
			

			// calendar.addEventListener('changeDate', () => {
			// 	datepicker.hide();
			// })

		  // calendar.addEventListener("focus", function() {
		  //   this.blur();
			// 	datepicker.hide();
		  // });
	})

});