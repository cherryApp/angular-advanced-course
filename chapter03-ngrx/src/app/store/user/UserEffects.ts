import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { UserService } from 'src/app/service/user.service';
import { loadItems, getItems } from './UserActions';
import { switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable()
export class UserEffect {
  loadItems$ = this.actions$.pipe(
    ofType(getItems),
    switchMap( () => this.userService.get() ),
    switchMap( users => of({ type: '[User] load items', items: users })),
    catchError( error => of({ type: '[User] error item', message: error })),
  );


  constructor(
    private actions$: Actions,
    private userService: UserService,
  ) { }

}
