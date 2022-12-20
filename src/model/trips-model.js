import { getRandomTrip } from '../mock/task';

const TRIP_COUNT = 4;

export default class TripModel {
  trips = Array.from({length: TRIP_COUNT}, getRandomTrip);

  getTrip() {
    return this.trips;
  }
}

