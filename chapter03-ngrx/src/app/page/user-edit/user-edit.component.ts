import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, take } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { getOneItem, updateItem } from 'src/app/store/user/UserActions';
import { selectOneItem } from 'src/app/store/user/UserReducers';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  user$: Observable<User> = null;
  userID: number;
  serverError = '';

  constructor(
    private userService: UserService,
    private ar: ActivatedRoute,
    private store: Store<any>,
  ) { }

  ngOnInit(): void {
    this.userID = parseInt(this.ar.snapshot.params.id, 10);
    this.store.dispatch( getOneItem({id: this.userID}) );
    this.user$ = this.store.pipe( select(selectOneItem) );
  }

  onSubmit(ngForm: NgForm): void {
    const user: User = ({...ngForm.value, id: this.userID});
    this.store.dispatch( updateItem({item: user}) );
    history.back();
  }

}
