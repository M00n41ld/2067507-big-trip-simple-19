const SortType = {
  DAY: 'default',
  PRICE: 'price-down',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
};

const UserAction = {
  UPDATE_TASK: 'UPDATE_TASK',
  ADD_TASK: 'ADD_TASK',
  DELETE_TASK: 'DELETE_TASK',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const dateFormats = {
  DATE_FORMAT: 'DD/MM/YYYY HH:mm',
  DATE_FORMAT_TIME: 'HH:mm',
  DATE_FORMAT_FORMS: 'DD/MM/YYYY HH:mm',
};

export {SortType, UserAction, UpdateType, FilterType, dateFormats};
