import AbstractView from '../framework/view/abstract-view';
import { FilterType } from '../const';

const NoPointsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
};

const createNoTripsTemplate = (filterType) => {
  const noPointsTextType = NoPointsTextType[filterType];
  return (
    `<p class="trip-events__msg">${noPointsTextType}</p>`
  );
};

export default class NoTrips extends AbstractView {
  #filterType = null;
  constructor({ filterType }) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoTripsTemplate(this.#filterType);
  }
}
