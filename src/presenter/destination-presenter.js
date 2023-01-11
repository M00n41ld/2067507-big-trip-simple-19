import {render, replace, remove} from '../framework/render.js';
import NewDestination from '../view/destinations';
import EditForm from '../view/edit-form.js';

export default class TripPresenter {
  #tripListContainer = null;
  #handleDataChange = null;
  #tripComponent = null;
  #editTripComponent = null;

  #trip = null;

  constructor({tripListContainer, onDataChange}) {
    this.#tripListContainer = tripListContainer;
    this.#handleDataChange = onDataChange;
  }


  init(trip) {
    this.#trip = trip;

    const prevTripComponent = this.#tripComponent;
    const prevTripEditComponent = this.#editTripComponent;

    this.#tripComponent = new NewDestination({
      trip: this.#trip,
      onEditClick: this.#handleEditClick,
    });

    this.#editTripComponent = new EditForm({
      trip: this.#trip,
      onFormSubmit: this.#handleFormSubmit,
      onEditCloseClick: this.#handleEditCloseClick,
      onCheckboxClick: this.#handleCheckedClick,
    });
    //непонятно как это работает
    // render(this.#tripComponent, this.#tripListContainer);
    if (prevTripComponent === null || prevTripEditComponent === null) {
      render(this.#tripComponent, this.#tripListContainer);
      return;
    }
    if (this.#tripListContainer.contains(prevTripComponent.element)) {
      replace(this.#editTripComponent, prevTripComponent);
    }

    if (this.#tripListContainer.contains(prevTripEditComponent.element)) {
      replace(this.#tripComponent, prevTripEditComponent);
    }
    remove(prevTripComponent);
    remove(prevTripEditComponent);
  }

  destroy() {
    remove(this.#tripComponent);
    remove(this.#editTripComponent);
  }

  #replaceCardToForm() {
    replace(this.#editTripComponent, this.#tripComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceFormToCard() {
    replace(this.#tripComponent, this.#editTripComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToCard();
    }
  };

  #handleCheckedClick = (test) => {
    // console.log(this.#handleCheckedClick)
    // console.log(test.querySelector('input').checked);
    if (test.querySelector('input').checked) {
      const fullId = test.querySelector('input').id
      const idCropped = fullId.slice(fullId.length - 1)
      console.log(this.#trip.offerByType.offers[idCropped - 1])
      console.log(idCropped)
      this.#trip.checkedOffers.push(this.#trip.offerByType.offers[idCropped - 1])
      console.log(this.#trip.checkedOffers)
      // this.#handleDataChange({})
      console.log({...this.#trip})
    }
  };

  #handleEditClick = () => {
    this.#replaceCardToForm();
  };

  #handleEditCloseClick = () => {
    this.#replaceFormToCard();
  };

  #handleFormSubmit = (trip) => {
    // console.log(this.#handleDataChange)
    this.#handleDataChange(trip);
    this.#replaceFormToCard();
  };
}

