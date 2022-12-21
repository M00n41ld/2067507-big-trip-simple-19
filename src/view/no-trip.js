import { createElement } from '../render';

function createNoTripsTemplate() {
  return (
    '<p class="trip-events__msg">Click New Event to create your first point</p>'
  );
}

export default class NoTrips {
  #element = null;

  get template() {
    return createNoTripsTemplate();
  }

  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
