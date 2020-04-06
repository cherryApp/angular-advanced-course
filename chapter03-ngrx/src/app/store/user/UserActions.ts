import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/model/user';

// Constant names for actions.
export const GET_ITEMS = '[User] get items';
export const GET_ONE_ITEM = '[User] get item';
export const LOAD_ITEMS = '[User] load items';
export const LOAD_SELECTED_ITEM = '[User] load selected';
export const UPDATE_ITEM = '[User] update item';
export const LOAD_UPDATED_ITEM = '[User] load updated';
export const ADD_ITEM = '[User] add item';
export const LOAD_ADDED_ITEM = '[User] load added';

export const ERROR_ITEM = '[User] error item';


// Actions.
export const getItems = createAction(GET_ITEMS);
export const getOneItem = createAction(
  GET_ONE_ITEM,
  props<{id: string | number}>()
);

export const loadItems = createAction(
  LOAD_ITEMS,
  props<{items: User[]}>()
);
export const loadSelectedItem = createAction(
  LOAD_SELECTED_ITEM,
  props<{selected: User}>()
);

export const updateItem = createAction(
  UPDATE_ITEM,
  props<{item: User}>()
);
export const loadUpdatedItem = createAction(
  LOAD_UPDATED_ITEM,
  props<{item: User}>()
);

export const addItem = createAction(
  ADD_ITEM,
  props<{item: User}>()
);
export const loadAddedItem = createAction(
  LOAD_ADDED_ITEM,
  props<{item: User}>()
);

export const errorItem = createAction(
  ERROR_ITEM,
  props<{message: string}>()
);

