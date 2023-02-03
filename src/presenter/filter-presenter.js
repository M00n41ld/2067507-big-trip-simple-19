import { render, remove, replace } from '../framework/render';
import NewFilters from '../view/filters';
import { UpdateType } from '../const';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #tripModel = null;
  #filterComponent = null;

  constructor({ filterContainer, filterModel, tripModel }) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#tripModel = tripModel;
    this.#tripModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get trips() {
    const trips = this.#tripModel.trip;
    return trips;
  }

  init() {
    const trips = this.trips;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new NewFilters({
      trips,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }
    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }
    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}

