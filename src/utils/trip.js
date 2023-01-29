import dayjs from 'dayjs';
import { FilterType } from '../const';
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

function makingOffersByType(items, typeOfOffer, checkedTrip) {
  for (let i = 0; i < items.length; i++) {
    if (items[i].type === typeOfOffer) {
      checkedTrip.offers = items[i].offers;
    }
  }
  return checkedTrip;
}

function sortPriceDown(A, B) {
  return B.basePrice - A.basePrice;
}

function getWeightForNullDate(dateA, dateB) {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }
  return null;
}

function sortDayUp(A, B) {
  const weight = getWeightForNullDate(A.dateFrom, B.dateFrom);
  return weight ?? dayjs(A.dateFrom).diff(dayjs(B.dateFrom));
}

function isInPast(element) {
  const now = Date.now();
  const date = new Date(element.dateTo);
  const timestampInMs = date.getTime();
  return timestampInMs <= now;
}

const filter = {
  [FilterType.EVERYTHING]: (trips) => trips.filter((trip) => trip),
  [FilterType.FUTURE]: (trips) => trips.filter((trip) => !isInPast(trip)),
};

export { filter, sortDayUp, sortPriceDown, makingOffersByType, humanizeTaskDueDate, humanizeTaskDueTime, humanizeDate };
