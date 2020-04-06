import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { UserService } from 'src/app/service/user.service';
import { loadItems, getItems, getOneItem, LOAD_ITEMS, ERROR_ITEM, LOAD_SELECTED_ITEM, updateItem, LOAD_UPDATED_ITEM, addItem, LOAD_ADDED_ITEM } from './UserActions';
import { switchMap, catchError, tap, withLatestFrom } from 'rxjs/operators';
import { of, Observable } from 'rxjs';


@Injectable()
export class UserEffect {
  loadItems$ = createEffect( (): Observable<Action> => {
    return this.actions$.pipe(
      ofType(getItems),
      switchMap( () => this.userService.get() ),
      switchMap( users => of({ type: LOAD_ITEMS, items: users })),
      catchError( error => of({ type: ERROR_ITEM, message: error })),
    );
  });

  getOneItem$ = createEffect( (): Observable<Action> => {
    return this.actions$.pipe(
      ofType(getOneItem),
      withLatestFrom(this.store$),
      switchMap( ([action, store]) => {
        const cache = store.users?.items?.find( item => item.id === action.id );
        return cache ? of(cache) : this.userService.get(action.id);
       } ),
      switchMap( user => of({ type: LOAD_SELECTED_ITEM, selected: user })),
      catchError( error => of({ type: ERROR_ITEM, message: error })),
    );
  });

  updateItem$ = createEffect( (): Observable<Action> => {
    return this.actions$.pipe(
      ofType(updateItem),
      switchMap( action => this.userService.update(action.item) ),
      switchMap( user => of({ type: LOAD_UPDATED_ITEM, item: user })),
      catchError( error => of({ type: ERROR_ITEM, message: error })),
    );
  });

  addItem$ = createEffect( (): Observable<Action> => {
    let lastAcion = null;
    return this.actions$.pipe(
      ofType(addItem),
      tap( action => lastAcion = action ),
      switchMap( action => this.userService.create(action.item) ),
      switchMap( () => this.userService.query(`email=${lastAcion.item.email}`) ),
      switchMap( user => of({ type: LOAD_ADDED_ITEM, item: user })),
      catchError( error => of({ type: ERROR_ITEM, message: error })),
    );
  });

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private store$: Store<any>,
  ) { }

}
