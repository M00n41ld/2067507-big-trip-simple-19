import { render, replace, remove } from '../framework/render.js';
import NewDestination from '../view/new-destination';
import EditForm from '../view/edit-form.js';
import { UserAction, UpdateType } from '../const.js';

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

  constructor({ tripListContainer, onDataChange, onModeChange }) {
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
      onDeleteClick: this.#handleDeleteClick,
    });

    this.#tripComponent = new NewDestination({
      trip: this.#trip,
      onEditClick: this.#handleEditClick,
    });

    if (prevTripComponent === null || prevTripEditComponent === null) {
      render(this.#tripComponent, this.#tripListContainer);
      return;
    }
    if (this.#mode === Mode.EDITING) {
      replace(this.#tripComponent, prevTripEditComponent);
      this.#mode = Mode.DEFAULT;
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
      this.#editTripComponent.reset(this.#trip);
      this.#replaceFormToCard();
    }
  }

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#editTripComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#editTripComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#tripComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#editTripComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#editTripComponent.shake(resetFormState);
  }

  #replaceCardToForm() {
    replace(this.#editTripComponent, this.#tripComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToCard() {
    replace(this.#tripComponent, this.#editTripComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #handleEditClick = () => {
    this.#replaceCardToForm();
  };

  #handleEditCloseClick = () => {
    this.#editTripComponent.reset(this.#trip);
    this.#replaceFormToCard();
  };

  #handleFormSubmit = (update) => {
    this.#handleDataChange(
      UserAction.UPDATE_TASK,
      UpdateType.MINOR,
      update,
    );
  };

  #handleDeleteClick = (update) => {
    this.#handleDataChange(
      UserAction.DELETE_TASK,
      UpdateType.MINOR,
      update,
    );
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#editTripComponent.reset(this.#trip);
      this.#replaceFormToCard();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };
}

