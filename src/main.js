import TripsApiService from './trips-api-service';
import BoardPresenter from './presenter/board-presenter';
import '../src/utils/trip';
import TripModel from './model/trips-model';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';
import NewTripButton from './view/new-trip-button';

const AUTHORIZATION = 'Basic hk44wcl1sa2j';
const END_POINT = 'https://19.ecmascript.pages.academy/big-trip-simple';
const filtersElement = document.querySelector('.trip-controls__filters');
const mainElement = document.querySelector('.trip-events');
const filterModel = new FilterModel();

const tripModel = new TripModel({
  tripsApiService: new TripsApiService(END_POINT, AUTHORIZATION)
});
const boardPresenter = new BoardPresenter({ listContainer: mainElement, tripModel, filterModel,
  onNewTripDestroy: handleNewTripFormClose});
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

filterPresenter.init();
boardPresenter.init();
tripModel.init();
