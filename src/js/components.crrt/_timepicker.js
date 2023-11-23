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

function updateSliderTime(slider, hours, minutes) {
  const handle = slider.querySelector('.handle');
  handle.textContent = formatTime(hours, minutes);
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
  const handle = slider.querySelector('.handle');
  handle.style.left = Math.max(0, Math.min(position, 94)) + '%';
}

function initSlider(slider) {
  let dragging = false;

  const minTime = slider.getAttribute('data-min');
  const maxTime = slider.getAttribute('data-max');
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

const sliders = document.querySelectorAll('.slider');
sliders.forEach(function(slider) {
  initSlider(slider);
});
