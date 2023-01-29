import { remove, render, RenderPosition } from '../framework/render';
import EditForm from '../view/edit-form';
import { nanoid } from 'nanoid';
import { UserAction, UpdateType } from '../const';
import NewForm from '../view/new-form';

export default class NewTripPresenter {
  #tripListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #trip = null;

  #tripEditComponent = null;

  constructor({ tripListContainer, onDataChange, onDestroy, trip }) {
    this.#tripListContainer = tripListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.#trip = trip;
  }

  get trip() {
    const trip = this.#trip;
    return trip;
  }

  init() {
    const trip = this.#trip;
    if (this.#tripEditComponent !== null) {
      return;
    }

    this.#tripEditComponent = new NewForm({
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
      trip
    });

    render(this.#tripEditComponent, this.#tripListContainer, RenderPosition.AFTERBEGIN)

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

  #handleFormSubmit = (trip) => {
    this.#handleDataChange(
      UserAction.ADD_TASK,
      UpdateType.MINOR,
      { id: nanoid(), ...trip },
    );
    this.destroy();
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
