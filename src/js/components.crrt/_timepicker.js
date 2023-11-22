/*

                  <div class="slider-container">
                    <div id="time-slider" class="slider"></div>
                  </div>

*/
window.addEventListener('DOMContentLoaded', (event) => {
	// Получаем элемент слайдера времени
var slider = document.getElementById("time-slider");
var sliderContainer = document.querySelector(".slider-container");

// Устанавливаем обработчики событий
slider.addEventListener("mousedown", startDrag);
slider.addEventListener("mousemove", drag);
slider.addEventListener("mouseup", stopDrag);
sliderContainer.addEventListener("mouseleave", stopDrag);

slider.addEventListener("touchstart", startDrag);
slider.addEventListener("touchmove", drag);
slider.addEventListener("touchend", stopDrag);
slider.addEventListener("touchcancel", stopDrag);

// Переменные для хранения состояния перетаскивания
var isDragging = false;
var startX = 0;

// Количество минут в интервале времени
var intervalMinutes = 15;

// Устанавливаем начальные координаты перетаскивания при начале перетаскивания
function startDrag(event) {
  isDragging = true;
  startX = event.clientX || event.touches[0].clientX;
}

// Обновляем положение ползунка при перетаскивании
function drag(event) {
  if (isDragging) {
    var currentX = event.clientX || event.touches[0].clientX;
    var offsetX = currentX - startX;
    var timeMinutes = calculateTime(offsetX);
    updateTime(timeMinutes);
  }
}

// Завершаем перетаскивание
function stopDrag() {
  isDragging = false;
}

// Расчитываем время на основе смещения ползунка
function calculateTime(offsetX) {
  var sliderWidth = sliderContainer.offsetWidth;
  var timeRange = 24 * 60; // Диапазон времени в минутах
  var minutesPerPixel = timeRange / sliderWidth;
  var time = minutesPerPixel * offsetX;
  time = Math.max(0, Math.min(timeRange, time)); // Ограничиваем время в диапазоне от 0 до 24 * 60
  return time;
}

// Обновляем значение времени
function updateTime(timeMinutes) {
  // Переводим время в часы и минуты
  var hours = Math.floor(timeMinutes / 60);
  var minutes = Math.round((timeMinutes % 60) / intervalMinutes) * intervalMinutes;

  // Форматируем время в формат HH:MM
  var formattedTime = hours.toString().padStart(2, "0") + ":" + minutes.toString().padStart(2, "0");

  // Здесь можно выполнить нужные действия с выбранным временем, например, отобразить его на странице
  console.log("Выбранное время:", formattedTime);
  document.querySelector('.slider').innerText = formattedTime;
  
}
});