import { getRandomTrip } from '../mock/task';
import { offersByType } from '../mock/task';
import { destinationsList } from '../mock/task';
// console.log(offersByType)
const TRIP_COUNT = 22;

export default class TripModel {
  #trips = Array.from({length: TRIP_COUNT}, getRandomTrip);
  #allOffersByType = offersByType;
  #pointsList = destinationsList;

  get trip() {
    return this.#trips.map((trip) => {
      const destinationPoint = this.#pointsList.find((point) => point.id === trip.id);
      const offerByType = this.#allOffersByType.find((offer) => offer.type === trip.type);
      return {
        ...trip,
        offerByType,
        offersByType,
        destinationPoint
      };
    });
  }
}

