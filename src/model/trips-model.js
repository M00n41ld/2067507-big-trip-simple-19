import { getRandomTrip } from '../mock/task';
import { offersByType } from '../mock/task';
import { destinationsList } from '../mock/task';
import Observable from '../framework/observable.js';

const TRIP_COUNT = 5;

export default class TripModel extends Observable {
  #trips = Array.from({ length: TRIP_COUNT }, getRandomTrip);
  #allOffersByType = offersByType;
  #pointsList = destinationsList;

  get trip() {
    return this.#trips.map((trip) => {
      const destinationPoint = this.#pointsList.find((point) => point.id === trip.destination);
      const offerByType = this.#allOffersByType.find((offer) => offer.type === trip.type);

      return {
        ...trip,
        offerByType,
        offersByType,
        destinationPoint,
        destinationsList,

      };

    });
  }


  updateTrip(updateType, update) {
    const index = this.#trips.findIndex((trip) => trip.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this.#trips = [
      ...this.#trips.slice(0, index),
      update,
      ...this.#trips.slice(index + 1)
    ];

    this._notify(updateType, update);
  }


  addTrip(updateType, update) {
    this.#trips = [
      update,
      ...this.#trips,
    ];
    this._notify(updateType, update);
  }

  deleteTrip(updateType, update) {
    const index = this.#trips.findIndex((trip) => trip.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }
    this.#trips = [
      ...this.#trips.slice(0, index),
      ...this.#trips.slice(index + 1),
    ];
    this._notify(updateType);
  }
}
