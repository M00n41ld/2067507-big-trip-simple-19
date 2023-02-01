import { remove, render } from '../framework/render.js';
import TripPresenter from './destination-presenter.js';
import NewSorting from '../view/sorting';
import NewList from '../view/destinations-list';
import { RenderPosition } from '../framework/render.js';
import { offersByType } from '../mock/task';
import NoTrips from '../view/no-trip';
import { SortType, UpdateType, UserAction, FilterType } from '../const.js';
import { sortPriceDown, sortDayUp } from '../utils/trip.js';
import { filter } from '../utils/trip.js';
import NewTripPresenter from './newTrip-presenter.js';
import Loading from '../view/loading.js';

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

  constructor({ listContainer, tripModel, filterModel, onNewTripDestroy }) {
    this.#listContainer = listContainer;
    this.#tripModel = tripModel;
    this.#tripModel.addObserver(this.#handleModelEvent);
    this.#filterModel = filterModel;
    this.#newTripPresenter = new NewTripPresenter({
      tripListContainer: this.#listComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewTripDestroy,
      trip: this.#tripModel.trip
    });

    this.#filterModel.addObserver(this.#handleModelEvent);

  }

  get trips() {
    this.#filterType = this.#filterModel.filter;
    const trips = this.#tripModel.trip;
    const filteredTrip = filter[this.#filterType](trips);
    switch (this.#currentSortType) {
      case SortType.PRICE:
        return filteredTrip.sort(sortPriceDown);
      case SortType.DAY:
        return filteredTrip.sort(sortDayUp);

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
    this.#newTripPresenter.init();
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

  #renderLoading() {
    render(this.#loadingComponent, this.#listContainer);
  }

  #clearBoard({ resetSortType = false, resetFilterType = false } = {}) {
    const tripCount = this.trips.length;
    console.log(tripCount)
    this.#newTripPresenter.destroy();
    this.#tripPresenters.forEach((presenter) => presenter.destroy());
    this.#tripPresenters.clear();
    // remove(this.#noTripsComponent);
    remove(this.#loadingComponent);
    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
      this.#clearSorting();
      this.#renderSorting();
    }

    if (this.#noTripsComponent) {
      remove(this.#noTripsComponent);
    }

    //что дает
    if (resetFilterType) {
      this.#filterType = FilterType.EVERYTHING;
    }
  }

  #clearSorting() {
    remove(this.#sortingComponent);
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_TASK:
        this.#tripModel.updateTrip(updateType, update);
        break;
      case UserAction.ADD_TASK:
        this.#tripModel.addTrip(updateType, update);
        break;
      case UserAction.DELETE_TASK:
        this.#tripModel.deleteTrip(updateType, update);
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #renderSorting() {
    this.#sortingComponent = new NewSorting({
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#listComponent, this.#listContainer);
    render(this.#sortingComponent, this.#listComponent.element, RenderPosition.BEFOREBEGIN);
  }

  #renderSortingPlate() {
    this.#renderSorting();
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
    // render(this.#listComponent, this.#listContainer);
    // render(new EditForm(), this.listComponent.element, RenderPosition.AFTERBEGIN);
    // render(new NewForm({trip: this.#boardTrips[0], allOffers: offersByType}), this.#listComponent.element, RenderPosition.BEFOREEND);
    for (let i = 0; i < this.trips.length; i++) {
      this.#renderTrip(this.trips[i], offersByType);
    }
  }
}


