import { remove, render } from '../framework/render.js';
import TripPresenter from './destination-presenter.js';
import NewSorting from '../view/new-sorting';
import NewList from '../view/new-list';
import { RenderPosition } from '../framework/render.js';
import NoTrips from '../view/no-trip';
import { SortType, UpdateType, UserAction, FilterType } from '../const.js';
import { doSortPriceDown, doSortDayUp } from '../utils/trip.js';
import { filter } from '../utils/trip.js';
import NewTripPresenter from './new-trip-presenter.js';
import Loading from '../view/loading.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class BoardPresenter {
  #listContainer = null;
  #tripModel = null;
  #listComponent = new NewList();
  #tripPresenters = new Map();
  #noTripsComponent = null;
  #sortingComponent = null;
  #currentSortType = SortType.DAY;
  #filterModel = null;
  #filterType = FilterType.EVERYTHING;
  #newTripPresenter = null;
  #loadingComponent = new Loading();
  #isLoading = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({ listContainer, tripModel, filterModel, onNewTripDestroy }) {
    this.#listContainer = listContainer;
    this.#tripModel = tripModel;
    this.#tripModel.addObserver(this.#handleModelEvent);
    this.#filterModel = filterModel;
    this.#newTripPresenter = new NewTripPresenter({
      tripListContainer: this.#listComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewTripDestroy,
    });
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get trips() {
    this.#filterType = this.#filterModel.filter;
    const trips = this.#tripModel.trip;
    const filteredTrip = filter[this.#filterType](trips);
    switch (this.#currentSortType) {
      case SortType.PRICE:
        return filteredTrip.sort(doSortPriceDown);
      case SortType.DAY:
        return filteredTrip.sort(doSortDayUp);
    }
    return filteredTrip;
  }

  init() {
    this.#renderSortingPlate();
    this.#renderBoard();
  }

  createTrip() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newTripPresenter.init(this.#tripModel.defaultTrip);
  }

  #renderSortingPlate() {
    this.#renderSorting();
  }

  #renderSorting() {
    this.#sortingComponent = new NewSorting({
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#listComponent, this.#listContainer);
    render(this.#sortingComponent, this.#listComponent.element, RenderPosition.BEFOREBEGIN);
  }

  #renderBoard() {
    render(this.#listComponent, this.#listContainer);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (this.trips.length === 0) {
      this.#renderNoTrips();
      return;
    }
    // for (let i = 0; i < this.trips.length; i++) {
    //   this.#renderTrip(this.trips[i]);
    // }
    for (const trip of this.trips) {
      this.#renderTrip(trip);
    }
  }

  #renderTrip(trip) {
    const tripPresenter = new TripPresenter({
      tripListContainer: this.#listComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });

    tripPresenter.init(trip);
    this.#tripPresenters.set(trip.id, tripPresenter);
  }

  #renderNoTrips() {
    this.#noTripsComponent = new NoTrips({
      filterType: this.#filterType
    });
    render(this.#noTripsComponent, this.#listContainer);
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#listContainer);
  }

  #clearBoard({ resetSortType = false, resetFilterType = false } = {}) {
    this.#newTripPresenter.destroy();
    this.#tripPresenters.forEach((presenter) => presenter.destroy());
    this.#tripPresenters.clear();
    remove(this.#loadingComponent);
    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
      this.#clearSorting();
      this.#renderSorting();
    }

    if (this.#noTripsComponent) {
      remove(this.#noTripsComponent);
    }

    if (resetFilterType) {
      this.#filterType = FilterType.EVERYTHING;
    }
  }

  #clearSorting() {
    remove(this.#sortingComponent);
  }

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_TASK:
        this.#tripPresenters.get(update.id).setSaving();
        try {
          await this.#tripModel.updateTrip(updateType, update);
        } catch(err) {
          this.#tripPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_TASK:
        this.#newTripPresenter.setSaving();
        try {
          await this.#tripModel.addTrip(updateType, update);
        } catch(err) {
          this.#newTripPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_TASK:
        this.#tripPresenters.get(update.id).setDeleting();
        try {
          await this.#tripModel.deleteTrip(updateType, update);
        } catch(err) {
          this.#tripPresenters.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #handleModeChange = () => {
    this.#newTripPresenter.destroy();
    this.#tripPresenters.forEach((presenter) => { presenter.resetView(); });
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#tripPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({ resetSortType: true, resetFilterType: true });
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
    }
  };
}


