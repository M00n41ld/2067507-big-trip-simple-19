import dayjs from 'dayjs';

const DATE_FORMAT = 'DD/MM/YYYY HH:mm';
const DATE_FORMAT_TIME = 'HH:mm';
const getRandomPositiveInteger = (a, b) => {
  if (a < 0 || b < 0) {
    return NaN;
  }

  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function humanizeTaskDueDate(dueDate) {
  return dueDate ? dayjs(dueDate).format(DATE_FORMAT) : '';
}

function humanizeTaskDueTime(dueDate) {
  return dueDate ? dayjs(dueDate).format(DATE_FORMAT_TIME) : '';
}

function humanizeDate(date, formatData) {
  return date ? dayjs(date).format(formatData) : '';
}

// function isOptionChecked(repeating) {
//   return Object.values(repeating).some(Boolean);
// }

function makingOffersByType (items, typeOfOffer, checkedTrip) {
  for (let i = 0; i < items.length; i++) {
    if (items[i].type === typeOfOffer) {
      checkedTrip.offers = items[i].offers;
    }
  }
  return checkedTrip;
}
export {makingOffersByType ,getRandomArrayElement, getRandomPositiveInteger, humanizeTaskDueDate, humanizeTaskDueTime, humanizeDate};
