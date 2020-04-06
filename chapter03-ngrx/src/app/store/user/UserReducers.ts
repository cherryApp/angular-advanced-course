import { User } from 'src/app/model/user';
import { createReducer, on } from '@ngrx/store';
import { loadItems, errorItem, loadSelectedItem } from './UserActions';
import { Action } from 'rxjs/internal/scheduler/Action';


export interface State {
  [x: string]: any;
  users: { items: User[], selected?: User, error: string };
}

export const initialState: State = {
  users: { items: [], selected: null, error: '' }
};

export const UserReducer = createReducer(
  initialState,
  on(loadItems, (state, action) => ({
    ...state,
    items: action.items
  })),
  on(loadSelectedItem, (state, action) => ({
    ...state,
    selected: action.selected
  })),
  on(errorItem, (state, action) => ({
    ...state,
    error: action.message
  })),
);

export const selectItems = (state: State) => state.users.items;
export const selectOneItem = (state: State) => Object.assign({}, state.users.selected);
export const selectError = (state: State) => state.users.error;
