import {render} from '../framework/render.js';
import TripPresenter from './destination-presenter.js';
import NewSorting from '../view/sorting';
import { updateItem } from '../utils/common.js';
import NewList from '../view/destinations-list';
import { RenderPosition } from '../framework/render.js';
// import NewForm from '../view/new-form';
import { offersByType } from '../mock/task';
import NoTrips from '../view/no-trip';


export default class BoardPresenter {

  #listContainer = null;
  #tripModel = null;

  #listComponent = new NewList();

  #boardTrips = [];
  #tripPresenters = new Map();

  #noTripsComponent = new NoTrips();
  #sortingComponent = new NewSorting();

  constructor({listContainer, tripModel}) {
    this.#listContainer = listContainer;
    this.#tripModel = tripModel;

  }


  init() {
    this.#boardTrips = [...this.#tripModel.trip];

    this.#renderBoard();

  }

  #renderTrip(trip) {
    const tripPresenter = new TripPresenter({
      tripListContainer: this.#listComponent.element,
      onDataChange: this.#handleTripChange
    });
    //Что это вообще такое
    // console.log(this.#handleTripChange);
    tripPresenter.init(trip);
    this.#tripPresenters.set(trip.id, tripPresenter);

    // console.log(this.#tripPresenters);
  }

  #clearTripList() {
    this.#tripPresenters.forEach((presenter) => presenter.destroy());
  }

  #renderNoTrips() {
    render(this.#noTripsComponent, this.#listContainer);
  }

  #handleTripChange = (updatedTrip) => {
    this.#boardTrips = updateItem(this.#boardTrips, updatedTrip);
    this.#tripPresenters.get(updatedTrip.id).init(updatedTrip);
  };

  #renderSorting() {
    render(this.#sortingComponent, this.#listComponent.element, RenderPosition.BEFOREBEGIN);
  }

  #renderBoard() {
    if (this.#boardTrips.length === 0) {
      this.#renderNoTrips();
      return;
    }
    render(this.#listComponent, this.#listContainer);
    this.#renderSorting();
    // render(new EditForm(), this.listComponent.element, RenderPosition.AFTERBEGIN);
    // render(new NewForm({trip: this.#boardTrips[0], allOffers: offersByType}), this.#listComponent.element, RenderPosition.BEFOREEND);
    for (let i = 0; i < this.#boardTrips.length; i++) {
      this.#renderTrip(this.#boardTrips[i], offersByType);
    }

  }
}


