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

export {SortType, UserAction, UpdateType, FilterType};
