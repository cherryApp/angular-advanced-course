import { User } from 'src/app/model/user';
import { createReducer, on } from '@ngrx/store';
import { loadItems, errorItem } from './UserActions';
import { Action } from 'rxjs/internal/scheduler/Action';


export interface State {
  users: { items: User[], error: string };
}

export const initialState: State = {
  users: { items: [], error: '' }
};

export const UserReducer = createReducer(
  initialState,
  on(loadItems, (state, action) => ({
    ...state,
    items: action.items
  })),
  on(errorItem, (state, action) => ({
    ...state,
    error: action.message
  })),
);

export const selectItems = (state: State) => state.users.items;
export const selectError = (state: State) => state.users.error;
