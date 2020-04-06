import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { UserService } from 'src/app/service/user.service';
import { loadItems, getItems } from './UserActions';
import { switchMap, catchError, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';


@Injectable()
export class UserEffect {
  loadItems$ = createEffect( (): Observable<Action> => {
    return this.actions$.pipe(
      ofType(getItems),
      switchMap( () => this.userService.get() ),
      switchMap( users => of({ type: '[User] load items', items: users })),
      catchError( error => of({ type: '[User] error item', message: error })),
    );
  });

  constructor(
    private actions$: Actions,
    private userService: UserService,
  ) { }

}
