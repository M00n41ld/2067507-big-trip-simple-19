import { render } from '../render';
import NewSorting from '../view/sorting';
import NewDestination from '../view/destinations';
import NewList from '../view/destinations-list';
import { RenderPosition } from '../render';
// import EditForm from '../view/edit-form';
import NewForm from '../view/new-form';
import Offers from '../view/offers';
// console.log(new EditForm)
import { makingOffersByType } from '../utils';
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
    const {type} = this.boardTrips[0];
    // console.log(type)
    makingOffersByType(offersByType, type, this.boardTrips[0]);
    // this.boardNewPoint = this.newPointModel.getTrip();
    // console.log(makingOffersByType(offersByType, type, this.boardTrips[0]))
// console.log(this.boardTrips[0])
    render(this.listComponent, this.listContainer);
    render(new NewSorting(), this.listComponent.getElement(), RenderPosition.BEFOREBEGIN);
    // render(new EditForm(), this.listComponent.getElement(), RenderPosition.AFTERBEGIN);
    render(new NewForm({trip: this.boardTrips[0]}), this.listComponent.getElement(), RenderPosition.BEFOREEND);

    for (let i = 0; i < this.boardTrips[0].offers.length; i++) {
      // console.log(this.boardTrips[0].offers)
      render(new Offers({trip: this.boardTrips[0].offers[i]}),this.listComponent.getElement());
    }

    for (let i = 1; i < this.boardTrips.length; i++) {
      render(new NewDestination({trip: this.boardTrips[i]}), this.listComponent.getElement(), RenderPosition.BEFOREEND);
    }
  }
}

