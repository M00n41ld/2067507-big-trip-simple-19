import { createElement } from '../render';
import { humanizeDate} from '../utils';

const DATE_FORMAT_TIME = 'HH:mm';
const DATE_FORMAT_DAY = 'DD MMM';

function createDestinationTemplate(trip, allOffers) {
  const {basePrice, dateFrom, dateTo, destination, type} = trip;
  const {name} = destination;

  const timeFromHum = humanizeDate(dateFrom, DATE_FORMAT_TIME);
  const timeToHum = humanizeDate(dateTo, DATE_FORMAT_TIME);
  const dateFromHum = humanizeDate(dateFrom, DATE_FORMAT_DAY);

  const allOffersByType = allOffers.find((offer) => offer.type === type);
  const { offers} = allOffersByType;


  function showChecked () {
    const visibleOffers = [];
    for (let i = 0; i < offers.length; i++) {
      for (let j = 0; j < trip.offers.length; j++) {
        if (offers[i].id === trip.offers[j]) {
          visibleOffers.push(offers[i]);
        }
      }
    }
    return visibleOffers;
  }

  const checkedOffers = showChecked();

  return (
    `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="2019-03-18">${dateFromHum}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T10:30">${timeFromHum}</time>
          &mdash;
          <time class="event__end-time" datetime="2019-03-18T11:00">${timeToHum}</time>
        </p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${checkedOffers.map((offer) => (`<li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </li>`)).join('')}
      </ul>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`
  );
}

export default class NewDestination {
  constructor({trip, allOffers}) {
    this.trip = trip;
    this.allOffers = allOffers;
    // this.offersByType = offersByType;
  }

  getTemplate() {
    return createDestinationTemplate(this.trip, this.allOffers);
  }

  getElement() {
    if(!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
// console.log(NewDestination)
