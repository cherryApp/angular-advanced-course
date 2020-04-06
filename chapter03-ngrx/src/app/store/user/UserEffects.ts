import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { UserService } from 'src/app/service/user.service';
import { loadItems, getItems, getOneItem, LOAD_ITEMS, ERROR_ITEM, LOAD_SELECTED_ITEM } from './UserActions';
import { switchMap, catchError, tap } from 'rxjs/operators';
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
      switchMap( action => this.userService.get(action.id) ),
      switchMap( user => of({ type: LOAD_SELECTED_ITEM, selected: user })),
      catchError( error => of({ type: ERROR_ITEM, message: error })),
    );
  });

  constructor(
    private actions$: Actions,
    private userService: UserService,
  ) { }

}
