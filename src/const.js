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
  CANCEL: 'CANCEL'
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const DateFormat = {
  DAY: 'MMM DD',
  TIME: 'HH:mm',
  FORMS: 'DD/MM/YYYY HH:mm',
};

export {SortType, UserAction, UpdateType, FilterType, DateFormat};
