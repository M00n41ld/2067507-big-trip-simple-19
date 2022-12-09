import NewFilters from './view/filters';
import { render } from './render';
import BoardPresenter from './presenter/board-presenter';
// import NewSorting from './view/sorting';
// import NewDestination from './view/destinations';
// import NewList from './view/destinations-list';
const filtersElement = document.querySelector('.trip-controls__filters');
const mainElement = document.querySelector('.trip-events');
// const listElement = sortingElement.querySelector('.trip-events__list');
// console.log(listElement)
const boardPresenter = new BoardPresenter({listContainer: mainElement});

render(new NewFilters(), filtersElement);
// render(new NewSorting(), sortingElement);
// render(new NewList(), sortingElement);
// render(new NewDestination(), listElement);
boardPresenter.init();
