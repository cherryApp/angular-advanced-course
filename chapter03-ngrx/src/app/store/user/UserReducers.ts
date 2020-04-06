import { User } from 'src/app/model/user';
import { createReducer, on } from '@ngrx/store';
import { loadItems, errorItem, loadSelectedItem, loadUpdatedItem, loadAddedItem, removeDeletedItem, errorFlush } from './UserActions';
import { Action } from 'rxjs/internal/scheduler/Action';


export interface State {
  [x: string]: any;
  users: { items: User[], selected?: User, error: any };
}

export const initialState: State = {
  users: { items: [], selected: null, error: null }
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
  on(loadUpdatedItem, (state, action) => ({
    ...state,
    items: ((users): User[] => {
      const i = users.items.findIndex( (item: User) => item.id === action.item.id );
      const newItems = [...users.items];
      newItems[i] = action.item;
      return newItems;
    })(state)
  })),
  on(loadAddedItem, (state, action) => ({
    ...state,
    items: (state.items as User[]).concat(action.item)
  })),
  on(removeDeletedItem, (state, action) => ({
    ...state,
    items: (state.items as User[]).filter( item => item.id !== action.item.id )
  })),
  on(errorItem, (state, action) => ({
    ...state,
    error: action.error
  })),
  on(errorFlush, (state, action) => ({
    ...state,
    error: null
  })),
);

export const selectItems = (state: State) => state.users.items;
export const selectOneItem = (state: State) => Object.assign({}, state.users.selected);
export const selectError = (state: State) => state.users.error?.error;
