import dayjs from 'dayjs';

const DATE_FORMAT = 'DD/MM/YYYY HH:mm';
const DATE_FORMAT_TIME = 'HH:mm';

function humanizeTaskDueDate(dueDate) {
  return dueDate ? dayjs(dueDate).format(DATE_FORMAT) : '';
}

function humanizeTaskDueTime(dueDate) {
  return dueDate ? dayjs(dueDate).format(DATE_FORMAT_TIME) : '';
}

function humanizeDate(date, formatData) {
  return date ? dayjs(date).format(formatData) : '';
}

function makingOffersByType (items, typeOfOffer, checkedTrip) {
  for (let i = 0; i < items.length; i++) {
    if (items[i].type === typeOfOffer) {
      checkedTrip.offers = items[i].offers;
    }
  }
  return checkedTrip;
}


export {makingOffersByType, humanizeTaskDueDate, humanizeTaskDueTime, humanizeDate};
