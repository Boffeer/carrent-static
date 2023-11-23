function formatTime(hours, minutes) {
  let formattedHours = hours.toString();
  let formattedMinutes = minutes.toString();

  if (formattedHours.length < 2) {
    formattedHours = '0' + formattedHours;
  }

  if (formattedMinutes.length < 2) {
    formattedMinutes = '0' + formattedMinutes;
  }

  return formattedHours + ':' + formattedMinutes;
}

function updateSliderTime(timepicker, hours, minutes) {
  const handle = timepicker.querySelector('.timepicker__value');
  // handle.textContent = formatTime(hours, minutes);
  handle.value = formatTime(hours, minutes);
}

function calculateNearestStep(minutes, step) {
  const remainder = minutes % step;
  if (remainder < step / 2) {
    return minutes - remainder;
  } else {
    return minutes + (step - remainder);
  }
}

function calculateHandlePosition(slider, minHours, minMinutes, maxHours, maxMinutes, currentHours, currentMinutes) {
  const totalMinutes = (maxHours - minHours) * 60 + (maxMinutes - minMinutes);
  const selectedMinutes = (currentHours - minHours) * 60 + (currentMinutes - minMinutes);
  return (selectedMinutes / totalMinutes) * 100;
}

function updateHandlePosition(slider, position) {
  const handle = slider.querySelector('.timepicker__drag');
  handle.style.left = Math.max(2, Math.min(position, 100)) + '%';
}

function addLayout(timepickerControl, minTime, maxTime) {
  const minTimeIndicator = document.createElement('span');
  minTimeIndicator.classList.add('js_created');
  minTimeIndicator.classList.add('timepicker__min');
  minTimeIndicator.innerText = minTime
  timepickerControl.appendChild(minTimeIndicator);

  const maxTimeIndicator = document.createElement('span');
  maxTimeIndicator.classList.add('js_created');
  maxTimeIndicator.classList.add('timepicker__max');
  maxTimeIndicator.innerText = maxTime
  timepickerControl.appendChild(maxTimeIndicator);

  const lines = document.createElement('span');
  lines.classList.add('js_created');
  lines.classList.add('timepicker__lines');
  timepickerControl.appendChild(lines);
  for (let i = 0; i < 5; i++) {
    const dash = document.createElement('span');
    dash.classList.add('js_created');
    dash.classList.add('timepicker__lines-dash');
    lines.append(dash);
  }
}

function initSlider(slider) {
  let dragging = false;

  const timepickerControl = slider.querySelector('.timepicker__control')

  const minTime = slider.getAttribute('data-min');
  const maxTime = slider.getAttribute('data-max');

  addLayout(timepickerControl, minTime, maxTime);

  const step = parseInt(slider.getAttribute('data-step')) || 15;

  const [minHours, minMinutes] = minTime.split(':').map(val => parseInt(val));
  const [maxHours, maxMinutes] = maxTime.split(':').map(val => parseInt(val));

  let currentHours = minHours;
  let currentMinutes = minMinutes;

  updateSliderTime(slider, currentHours, currentMinutes);
  updateHandlePosition(slider, 0);

  function handleSliderMove(event) {
    if (!dragging) return;

    const sliderRect = slider.getBoundingClientRect();
    const position = (event.clientX - sliderRect.left) / sliderRect.width;

    const totalMinutes = (maxHours - minHours) * 60 + (maxMinutes - minMinutes);
    const selectedMinutes = Math.round(position * totalMinutes);

    const steppedMinutes = calculateNearestStep(selectedMinutes, step);

    currentHours = Math.floor((steppedMinutes / 60) % 24) + minHours;
    currentMinutes = steppedMinutes % 60 + minMinutes;

    if (currentHours < minHours) {
      currentHours = minHours;
      currentMinutes = minMinutes;
    }

    if (currentHours > maxHours || (currentHours === maxHours && currentMinutes > maxMinutes)) {
      currentHours = maxHours;
      currentMinutes = maxMinutes;
    }

    updateSliderTime(slider, currentHours, currentMinutes);
    updateHandlePosition(slider, calculateHandlePosition(slider, minHours, minMinutes, maxHours, maxMinutes, currentHours, currentMinutes));
  }

  slider.addEventListener('mousedown', function(event) {
    dragging = true;
    handleSliderMove(event);
    document.addEventListener('mousemove', handleSliderMove);
  });

  slider.addEventListener('touchstart', function(event) {
    dragging = true;
    handleSliderMove(event.touches[0]);
    document.addEventListener('touchmove', function(event) {
      handleSliderMove(event.touches[0]);
    });
  });

  document.addEventListener('mouseup', function() {
    if (dragging) {
      dragging = false;
      document.removeEventListener('mousemove', handleSliderMove);
    }
  });

  document.addEventListener('touchend', function() {
    if (dragging) {
      dragging = false;
      document.removeEventListener('touchmove', handleSliderMove);
    }
  });
}

const sliders = document.querySelectorAll('.timepicker');
sliders.forEach(timepicker => {
  initSlider(timepicker);
});
