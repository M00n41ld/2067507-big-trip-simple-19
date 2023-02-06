import { remove, render, RenderPosition } from '../framework/render';
import { UserAction, UpdateType } from '../const';
import NewForm from '../view/new-form';


export default class NewTripPresenter {
  #tripListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #trip = null;
  #tripEditComponent = null;


  constructor({ tripListContainer, onDataChange, onDestroy}) {
    this.#tripListContainer = tripListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  get trip() {
    const trip = this.#trip;
    return trip;
  }

  init(trip) {
    this.#trip = trip;
    if (this.#tripEditComponent !== null) {
      return;
    }

    this.#tripEditComponent = new NewForm({
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
      trip: this.trip
    });

    render(this.#tripEditComponent, this.#tripListContainer, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#tripEditComponent === null) {
      return;
    }
    this.#handleDestroy();
    remove(this.#tripEditComponent);
    this.#tripEditComponent = null;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setAborting() {
    const resetFormState = () => {
      this.#tripEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };
    this.#tripEditComponent.shake(resetFormState);
  }

  setSaving() {
    this.#tripEditComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  #handleFormSubmit = (trip) => {
    this.#handleDataChange(
      UserAction.ADD_TASK,
      UpdateType.MAJOR,
      trip,
    );
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
