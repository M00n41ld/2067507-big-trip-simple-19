import NewFilters from './view/filters';
import { render } from './framework/render.js';
import BoardPresenter from './presenter/board-presenter';
import '../src/utils/common';
import '../src/utils/trip';
import '../src/mock/task';
import TripModel from './model/trips-model';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';
const filtersElement = document.querySelector('.trip-controls__filters');
const mainElement = document.querySelector('.trip-events');
const filterModel = new FilterModel();

const tripModel = new TripModel();
const boardPresenter = new BoardPresenter({ listContainer: mainElement, tripModel, filterModel });
const filterPresenter = new FilterPresenter({
  filterContainer: filtersElement,
  filterModel,
  tripModel
});

filterPresenter.init();
boardPresenter.init();
