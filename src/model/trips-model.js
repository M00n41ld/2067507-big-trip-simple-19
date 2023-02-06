import Observable from '../framework/observable.js';
import { UpdateType } from '../const';

const DEFAULT_POINT = {
  'base_price': '',
  'date_from': '2019-07-10T22:55:56.845Z',
  'date_to': '2019-07-11T11:22:13.375Z',
  destination: 0,
  offers: [],
  type: 'taxi'
};

export default class TripModel extends Observable {
  #trips = [];
  #destinations = [];
  #offersByType = [];
  #tripsApiService = null;

  constructor({ tripsApiService }) {
    super();
    this.#tripsApiService = tripsApiService;
  }

  get trip() {
    return this.#trips.map((trip) => {
      const destinationPoint = this.#destinations.find((point) => point.id === trip.destination) ;
      const offerByType = this.#offersByType.find((offer) => offer.type === trip.type);
      const offersByType = this.#offersByType;
      const destinationsList = this.#destinations;
      return {
        ...trip,
        offerByType,
        offersByType,
        destinationPoint,
        destinationsList,
      };
    });
  }

  get defaultTrip() {
    const offerByType = this.#getOfferByType(DEFAULT_POINT).offerByType;
    const offersByType = this.#offersByType;
    const destinationPoint = this.#getDestinationPoint(DEFAULT_POINT).destination ? this.#getDestinationPoint(DEFAULT_POINT).destination : '';
    const destinationsList = this.#destinations;

    return {
      ...this.#adaptToClient(DEFAULT_POINT),
      offerByType,
      offersByType,
      destinationPoint,
      destinationsList,
    };
  }

  #getOfferByType = (trip) => {
    const offerByType = this.#offersByType.find((offer) => offer.type === trip.type);
    return {offerByType};
  };

  #getDestinationPoint = (trip) => {
    const destinationPoint = this.#destinations.find((point) => point.id === trip.destination);
    return {destinationPoint};
  };

  async init() {
    try {
      const trips = await this.#tripsApiService.trips;
      const destinations = await this.#tripsApiService.destinations;
      this.#trips = trips.map(this.#adaptToClient);
      this.#destinations = destinations;
      const offersByType = await this.#tripsApiService.offers;
      this.#offersByType = offersByType;
    } catch (err) {
      this.#trips = [];
      this.#destinations = [];
      this.#offersByType = [];
    }
    this._notify(UpdateType.INIT);
  }

  async updateTrip(updateType, update) {
    const index = this.#trips.findIndex((trip) => trip.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting trip');
    }

    try {
      const response = await this.#tripsApiService.updateTrip(update);
      const updatedTrip = this.#adaptToClient(response);
      this.#trips = [
        ...this.#trips.slice(0, index),
        updatedTrip,
        ...this.#trips.slice(index + 1),
      ];
      this._notify(updateType, updatedTrip);

    } catch (err) {
      throw new Error('Can\'t update trip');
    }
  }

  async addTrip(updateType, update) {
    try {
      const response = await this.#tripsApiService.addTrip(update);
      const newTrip = this.#adaptToClient(response);
      this.#trips = [newTrip, ...this.#trips];
      this._notify(updateType, newTrip);
    } catch (err) {
      throw new Error('Can\'t add trip');
    }
  }

  async deleteTrip(updateType, update) {
    const index = this.#trips.findIndex((trip) => trip.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }
    try {
      await this.#tripsApiService.deleteTrip(update);
      this.#trips = [
        ...this.#trips.slice(0, index),
        ...this.#trips.slice(index + 1),
      ];
      this._notify(updateType);
    } catch (err) {
      throw new Error('Can\'t delete trip');
    }
  }

  #adaptToClient(trip) {
    const adaptedTrip = {
      ...trip,
      dateFrom: new Date(trip['date_from']),
      basePrice: trip['base_price'],
      dateTo: new Date(trip['date_to']),
    };

    delete adaptedTrip['date_from'];
    delete adaptedTrip['date_to'];
    delete adaptedTrip['base_price'];

    return adaptedTrip;
  }
}
