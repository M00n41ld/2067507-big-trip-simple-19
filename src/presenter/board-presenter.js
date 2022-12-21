import { render } from '../render';
import NewSorting from '../view/sorting';
import NewDestination from '../view/destinations';
import NewList from '../view/destinations-list';
import { RenderPosition } from '../render';
// import EditForm from '../view/edit-form';
import NewForm from '../view/new-form';
import { offersByType } from '../mock/task';


export default class BoardPresenter {

  #listContainer = null;
  #tripModel = null;

  #listComponent = new NewList();

  #boardTrips = [];

  constructor({listContainer, tripModel}) {
    this.#listContainer = listContainer;
    this.#tripModel = tripModel;

  }


  init() {
    this.#boardTrips = [...this.#tripModel.trip];

    render(this.#listComponent, this.#listContainer);
    render(new NewSorting(), this.#listComponent.element, RenderPosition.BEFOREBEGIN);
    // render(new EditForm(), this.listComponent.element, RenderPosition.AFTERBEGIN);
    // render(new NewForm({trip: this.#boardTrips[0], allOffers: offersByType}), this.#listComponent.element, RenderPosition.BEFOREEND);

    for (let i = 0; i < this.#boardTrips.length; i++) {
      this.#renderTrip(this.#boardTrips[i], offersByType);
    }

  }

  #renderTrip(trip, allOffers) {
    const tripComponent = new NewDestination({trip, allOffers});

    const tripNewComponent = new NewForm({trip, allOffers});

    const replaceCardToForm = () => {
      this.#listComponent.element.replaceChild(tripNewComponent.element, tripComponent.element);
    };

    const replaceFormToCard = () => {
      this.#listComponent.element.replaceChild(tripComponent.element, tripNewComponent.element);
    };

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    tripComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceCardToForm();
      document.addEventListener('keydown', escKeyDownHandler);
    });

    tripNewComponent.element.querySelector('.event--edit').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    tripNewComponent.element.querySelector('.event--edit').addEventListener('reset', () => {
      replaceFormToCard();
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    render(tripComponent, this.#listComponent.element);
  }
}


//заглушку!
//Кнопка загрузки дальнейшего списка, нужна ли нам?
