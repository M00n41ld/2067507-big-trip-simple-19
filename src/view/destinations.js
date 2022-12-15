import { createElement } from '../render';
import { humanizeDate} from '../utils';

const DATE_FORMAT_TIME = 'HH:mm';
const DATE_FORMAT_DAY = 'DD MMM';

function createDestinationTemplate(trip) {
  const {basePrice, dateFrom, dateTo, destination, type, offers} = trip;
  const {name} = destination;

  const timeFromHum = humanizeDate(dateFrom, DATE_FORMAT_TIME);
  const timeToHum = humanizeDate(dateTo, DATE_FORMAT_TIME);
  const dateFromHum = humanizeDate(dateFrom, DATE_FORMAT_DAY);
  // const dateToHum = humanizeDate(dateTo, DATE_FORMAT_DAY);
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
        <li class="event__offer">
          <span class="event__offer-title">Order Uber</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">20</span>
        </li>
      </ul>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`
  );
}

export default class NewDestination {
  constructor({trip}) {
    this.trip = trip;
  }

  getTemplate() {
    return createDestinationTemplate(this.trip);
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
