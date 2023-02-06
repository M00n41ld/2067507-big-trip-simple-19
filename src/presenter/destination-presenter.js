import {render, replace, remove} from '../framework/render.js';
import NewDestination from '../view/destinations';
import EditForm from '../view/edit-form.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class TripPresenter {
  #tripListContainer = null;
  #handleDataChange = null;
  #tripComponent = null;
  #editTripComponent = null;
  #handleModeChange = null;

  #trip = null;
  #mode = Mode.DEFAULT;

  constructor({tripListContainer, onDataChange, onModeChange}) {
    this.#tripListContainer = tripListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }


  init(trip) {
    this.#trip = trip;
    const prevTripComponent = this.#tripComponent;
    const prevTripEditComponent = this.#editTripComponent;

    this.#editTripComponent = new EditForm({
      trip: this.#trip,
      onFormSubmit: this.#handleFormSubmit,
      onEditCloseClick: this.#handleEditCloseClick,
      // onCheckboxClick: this.#handleCheckedClick,
    });

    this.#tripComponent = new NewDestination({
      trip: this.#trip,
      onEditClick: this.#handleEditClick,
    });
    //непонятно как это работает
    // render(this.#tripComponent, this.#tripListContainer);
    if (prevTripComponent === null || prevTripEditComponent === null) {
      render(this.#tripComponent, this.#tripListContainer);
      return;
    }
    if (this.#mode === Mode.EDITING) {
      replace(this.#editTripComponent, prevTripEditComponent);
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#tripComponent, prevTripComponent);
    }

    remove(prevTripComponent);
    remove(prevTripEditComponent);
  }

  destroy() {
    remove(this.#tripComponent);
    remove(this.#editTripComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToCard();
    }
  }

  #replaceCardToForm() {
    replace(this.#editTripComponent, this.#tripComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
    console.log(this.#mode)
  }

  #replaceFormToCard() {
    replace(this.#tripComponent, this.#editTripComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
    // console.log(this.#mode)
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToCard();
    }
  };

  // #handleCheckedClick = (test) => {
  //   // console.log(this.#handleCheckedClick)
  //   // console.log(test.querySelector('input').checked);
  //   if (test.querySelector('input').checked) {
  //     const fullId = test.querySelector('input').id;
  //     const idCropped = fullId.slice(fullId.length - 1);
  //     this.#trip.checkedOffers.push(this.#trip.offerByType.offers[idCropped - 1]);
  //     this.#handleDataChange({...this.#trip});
  //   }
  // };

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

