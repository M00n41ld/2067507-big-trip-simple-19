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

// function getWeightForNullDate(A, B) {
//   if (A === null && B === null) {
//     return 0;
//   }

//   if (A === null) {
//     return 1;
//   }

//   if (B === null) {
//     return -1;
//   }

//   return null;
// }


function sortPriceDown (A, B) {
  // const weight = getWeightForNullDate(A.basePrice, B.basePrice);
  // console.log(A.basePrice, B.basePrice)
  return B.basePrice - A.basePrice;
  // if (A - B) {

  // }
  // console.log(A)
}
export {sortPriceDown, makingOffersByType, humanizeTaskDueDate, humanizeTaskDueTime, humanizeDate};
