import { render } from '../render';
import NewSorting from '../view/sorting';
import NewDestination from '../view/destinations';
import NewList from '../view/destinations-list';
import { RenderPosition } from '../render';
// import EditForm from '../view/edit-form';
import NewForm from '../view/new-form';
import { offersByType } from '../mock/task';
export default class BoardPresenter {
  listComponent = new NewList();

  constructor({listContainer, tripModel, newPointModel}) {
    this.newPointModel = newPointModel;
    this.listContainer = listContainer;
    this.tripModel = tripModel;
  }


  init() {
    this.boardTrips = [...this.tripModel.getTrip()];

    render(this.listComponent, this.listContainer);
    render(new NewSorting(), this.listComponent.getElement(), RenderPosition.BEFOREBEGIN);
    // render(new EditForm(), this.listComponent.getElement(), RenderPosition.AFTERBEGIN);
    render(new NewForm({trip: this.boardTrips[0], allOffers: offersByType}), this.listComponent.getElement(), RenderPosition.BEFOREEND);

    for (let i = 1; i < this.boardTrips.length; i++) {
      render(new NewDestination({trip: this.boardTrips[i], allOffers: offersByType}), this.listComponent.getElement(), RenderPosition.BEFOREEND);
    }
  }
}

