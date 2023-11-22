import { Datepicker, DateRangePicker } from 'vanillajs-datepicker';
import ru from 'vanillajs-datepicker/locales/ru';
import en from 'vanillajs-datepicker/locales/en-GB';
import es from 'vanillajs-datepicker/locales/es';

window.addEventListener('DOMContentLoaded', (event) => {
	const datepickers = document.querySelectorAll('.b_datepicker .input__field');
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

		const vanillaRangepicker = new DateRangePicker(rangepicker, {
			todayHighlight: true,
			language: pickerLang,
			locale: locales[pickerLang],
			minDate: today,
		});

		const datePickerFrom = vanillaRangepicker.inputs[0] 

		datePickerFrom.addEventListener('show', () => {
			vanillaRangepicker.datepickers[1].show();
		})
		datePickerFrom.addEventListener('changeDate', () => {
			setTimeout(() => {
				vanillaRangepicker.datepickers[1].show();
			})
		})
		datePickerFrom.addEventListener('changeYear', () => {
			setTimeout(() => {
				vanillaRangepicker.datepickers[1].show();
			})
		})
		datePickerFrom.addEventListener('changeView', () => {
			setTimeout(() => {
				vanillaRangepicker.datepickers[1].show();
			})
		})
		datePickerFrom.addEventListener('changeMonth', () => {
			setTimeout(() => {
				vanillaRangepicker.datepickers[1].show();
			})
		})
		datePickerFrom.addEventListener('changeDate', () => {
			setTimeout(() => {
				vanillaRangepicker.datepickers[1].show();
			})
		})

		const datePickerTo = vanillaRangepicker.inputs[1]
		datePickerTo.addEventListener('show', (e) => {
			vanillaRangepicker.datepickers[0].show()
		})
		datePickerTo.addEventListener('changeYear', () => {
			setTimeout(() => {
				vanillaRangepicker.datepickers[0].show();
			})
		})
		datePickerTo.addEventListener('changeView', () => {
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
		initDatepickers()
	});


	function initDatepickers() {
		const datepickers = document.querySelectorAll('.b_datepicker .input__field');
		datepickers.forEach(datepicker => {
			if(datepicker.closest('.b_rangepicker').classList.contains(CLASSES.rangeInite)) return;
			console.log('this')

			const pickerLang = datepicker.parentElement.getAttribute('data-lang');
			const today = new Date().getTime();


			const vanillaDatepicker = new Datepicker(datepicker, {
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
	}

});