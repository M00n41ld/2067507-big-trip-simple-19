import NewFilters from './view/filters';
import { render } from './render';
import BoardPresenter from './presenter/board-presenter';
import './utils';
import '../src/mock/task';
import TripModel from './model/trips-model';
import Offers from './view/offers';

const filtersElement = document.querySelector('.trip-controls__filters');
const mainElement = document.querySelector('.trip-events');
// const offersSection = document.querySelector('.event__section');
// console.log(offersSection)

const tripModel = new TripModel;
const boardPresenter = new BoardPresenter({listContainer: mainElement, tripModel});
render(new NewFilters(), filtersElement);

boardPresenter.init();
