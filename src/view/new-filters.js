import AbstractView from '../framework/view/abstract-view';
import { FilterType } from '../const';
function createFiltersTemplate(trips, currentFilterType) {
  const timeNow = Date.now();
  const filters = Object.values(FilterType);

  function isInPast(element) {
    const date = new Date(element.dateTo);
    const timestampInMs = date.getTime();

    return timestampInMs <= timeNow;
  }
  return (
    `<form class="trip-filters" action="#" method="get">
        ${filters.map((filter) => (`<div class="trip-filters__filter">
        <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value=${filter} ${filter === currentFilterType ? 'checked' : ''} ${trips.every(isInPast) && filter !== 'everything' ? 'disabled' : ''}>
        <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
      </div>`)).join('')}
        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>`
  );
}

export default class NewFilters extends AbstractView {
  #trips = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor({trips, currentFilterType, onFilterTypeChange }) {
    super();
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;
    this.#trips = trips;

    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;
    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFiltersTemplate(this.#trips, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };
}
