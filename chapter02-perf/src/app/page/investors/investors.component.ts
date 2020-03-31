import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../service/config.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-investors',
  templateUrl: './investors.component.html',
  styleUrls: ['./investors.component.scss']
})
export class InvestorsComponent implements OnInit {

  userList$ = this.userService.get();
  filterPhrase = '';
  constructor(
    private userService: UserService,
    private config: ConfigService,
  ) { }

  ngOnInit(): void {
  }

  handleKey(event: any) {
    if (event.keyCode === 13) {
      console.log(this.filterPhrase);
      this.filterPhrase = '';
    }
  }

}
