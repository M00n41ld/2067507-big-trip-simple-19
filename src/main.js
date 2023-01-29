import NewFilters from './view/filters';
import { render } from './framework/render.js';
import BoardPresenter from './presenter/board-presenter';
import '../src/utils/common';
import '../src/utils/trip';
import '../src/mock/task';
import TripModel from './model/trips-model';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';
import NewTripButton from './view/new-trip-button';
const filtersElement = document.querySelector('.trip-controls__filters');
const mainElement = document.querySelector('.trip-events');
const filterModel = new FilterModel();

const tripModel = new TripModel();
const boardPresenter = new BoardPresenter({ listContainer: mainElement, tripModel, filterModel,
  onNewTripDestroy: handleNewTripFormClose });
const filterPresenter = new FilterPresenter({
  filterContainer: filtersElement,
  filterModel,
  tripModel,
});

const newTripButtonComponent = new NewTripButton({
  onClick: handleNewTripButtonClick
});
function handleNewTripFormClose() {
  newTripButtonComponent.element.disabled = false;
}

function handleNewTripButtonClick() {
  boardPresenter.createTrip();
  newTripButtonComponent.element.disabled = true;
}
render(newTripButtonComponent, filtersElement);

filterPresenter.init();
boardPresenter.init();
