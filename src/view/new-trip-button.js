export default class NewTripButton {
  #handleClick = null;
  #element = null;

  constructor({ onClick }) {
    this.#handleClick = onClick;
    this.#element = document.querySelector('.trip-main__event-add-btn');
    this.#element.addEventListener('click', this.#clickHandler);
  }

  get element() {
    return this.#element;
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
