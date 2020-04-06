import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/service/user.service';
import { ConfigService } from 'src/app/service/config.service';
import { User } from 'src/app/model/user';
import { Store, select } from '@ngrx/store';
import { getItems, addItem, deleteItem, errorFlush } from 'src/app/store/user/UserActions';
import { selectItems, selectError } from 'src/app/store/user/UserReducers';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  // list$: Observable<User | User[]> = this.userService.get();
  list$: Observable<User | User[]>;
  cols: any[] = this.config.userColumns;
  error$ = this.store.pipe( select(selectError) ).pipe(
    tap( error => {
      const to = setTimeout( () => {
        clearTimeout(to);
        this.store.dispatch(errorFlush());
      }, 3000);
    })
  );

  constructor(
    private userService: UserService,
    private config: ConfigService,
    private store: Store<any>,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(getItems());
    this.list$ = this.store.pipe( select(selectItems) );
  }

  update(user: User): void {
    this.userService.update(user).toPromise().then(
      userResponse => console.log(userResponse),
      err => console.error(err)
    );
  }

  delete(user: User): void {
    if (!confirm('Are you sure?')) {
      return;
    }

    this.store.dispatch(deleteItem( {item: user}) );
  }

  create(): void {
    const user = new User();
    user.first_name = 'New';
    user.last_name = 'User';
    user.email = 'test@test.org';
    user.password = 'test';
    this.store.dispatch( addItem({item: user}) );
  }

}
