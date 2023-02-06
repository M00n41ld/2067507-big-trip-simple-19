import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export default class TripsApiService extends ApiService {
  get trips() {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({url: 'destinations'})
      .then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({url: 'offers'})
      .then(ApiService.parseResponse);
  }

  async updateTrip(trip) {
    const response = await this._load({
      url: `points/${trip.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(trip)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  }

  async addTrip(trip) {
    const response = await this._load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServer(trip)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  }

  async deleteTrip(trip) {
    const response = await this._load({
      url: `points/${trip.id}`,
      method: Method.DELETE,
    });
    return response;
  }

  #adaptToServer(trip) {
    const adaptedTrip = {
      ...trip,
      'date_from': trip.dateFrom.toISOString(),
      'base_price': trip.basePrice,
      'date_to': trip.dateTo.toISOString(),
    };
    delete adaptedTrip.dateFrom;
    delete adaptedTrip.dateTo;
    delete adaptedTrip.basePrice;
    delete adaptedTrip.offersByType;
    delete adaptedTrip.offerByType;
    delete adaptedTrip.destinationPoint;
    delete adaptedTrip.destinationsList;
    return adaptedTrip;
  }
}
