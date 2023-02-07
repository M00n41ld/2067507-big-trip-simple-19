import dayjs from 'dayjs';
import { FilterType } from '../const';
import { DateFormat } from '../const';
function humanizeTaskDueDate(dueDate) {
  return dueDate ? dayjs(dueDate).format(DateFormat.FORMS) : '';
}

function humanizeTaskDueTime(dueDate) {
  return dueDate ? dayjs(dueDate).format(DateFormat.TIME) : '';
}

function humanizeDate(date, formatData) {
  return date ? dayjs(date).format(formatData) : '';
}

function doSortPriceDown(first, second) {
  return second.basePrice - first.basePrice;
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

function doSortDayUp(first, second) {
  const weight = getWeightForNullDate(first.dateFrom, second.dateFrom);
  return weight ?? dayjs(first.dateFrom).diff(dayjs(second.dateFrom));
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

export { filter, doSortDayUp, doSortPriceDown, humanizeTaskDueDate, humanizeTaskDueTime, humanizeDate };
