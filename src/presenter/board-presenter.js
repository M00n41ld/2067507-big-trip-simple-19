import { render } from '../render';
import NewSorting from '../view/sorting';
import NewDestination from '../view/destinations';
import NewList from '../view/destinations-list';
import { RenderPosition } from '../render';
import EditForm from '../view/edit-form';
import NewForm from '../view/new-form';

export default class BoardPresenter {
  listComponent = new NewList();

  constructor({listContainer}) {
    this.listContainer = listContainer;
  }


  init() {
    render(this.listComponent, this.listContainer);
    render(new NewSorting(), this.listComponent.getElement(), RenderPosition.BEFOREBEGIN);
    render(new EditForm(), this.listComponent.getElement(), RenderPosition.AFTERBEGIN);
    render(new NewForm(), this.listComponent.getElement(), RenderPosition.BEFOREEND);

    for (let i = 0; i < 3; i++) {
      render(new NewDestination(), this.listComponent.getElement(), RenderPosition.BEFOREEND);
    }
  }
}
