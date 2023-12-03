"use strict"


// Пример использования
/* const startDateString = "01-12-2023 12:00";
const endDateString = "05-12-2023 18:30";

const result = findDatesBetween(startDateString, endDateString);
console.log(result);

 */
export function getDatesRange(startDateString, endDateString, returnType = 'array') {
  // Преобразовываем строки в объекты Date
  const startDate = new Date(startDateString.replace(/(\d{2})-(\d{2})-(\d{4}) (\d{1,2}):(\d{2})/, '$3-$2-$1T$4:$5'));
  const endDate = new Date(endDateString.replace(/(\d{2})-(\d{2})-(\d{4}) (\d{1,2}):(\d{2})/, '$3-$2-$1T$4:$5'));

  // Проверяем, что введены корректные даты
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return "Некорректные даты";
  }

  // Создаем массив для хранения результатов
  const resultDates = [];

  // Итерируем по датам и добавляем их в результат
  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    resultDates.push(currentDate.getTime());
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Преобразуем все даты в таймстэмпы
  const startTimestamp = startDate.getTime();
  const endTimestamp = endDate.getTime();
  const resultTimestamps = resultDates.map(date => date);

  if (returnType === 'array') {
    return [startTimestamp, endTimestamp, ...resultDates]
  } else {
    return {
      startTimestamp,
      ...resultTimestamps,
      endTimestamp,
    };
  }
}

export function getNumberDate(date, separator = '-') {
  date = new Date(date);

  let day = date.getDate();
  let month = date.getMonth() + 1; // Месяцы в JavaScript начинаются с 0
  let year = date.getFullYear();

  // Добавляем ведущий ноль для дней и месяцев, если они состоят из одной цифры
  day = day < 10 ? '0' + day : day;
  month = month < 10 ? '0' + month : month;

  // Возвращаем отформатированную строку
  return `${day}${separator}${month}${separator}${year}`
}
