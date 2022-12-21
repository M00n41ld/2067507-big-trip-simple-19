import { getRandomTrip } from '../mock/task';

const TRIP_COUNT = 22;

export default class TripModel {
  #trips = Array.from({length: TRIP_COUNT}, getRandomTrip);

  get trip() {
    return this.#trips;
  }
}

