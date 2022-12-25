import AbstractView from '../framework/view/abstract-view';

function createNoTripsTemplate() {
  return (
    '<p class="trip-events__msg">Click New Event to create your first point</p>'
  );
}

export default class NoTrips extends AbstractView{

  get template() {
    return createNoTripsTemplate();
  }
}
