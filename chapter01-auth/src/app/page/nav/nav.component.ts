import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  navigation = this.config.navigation;

  constructor(
    private config: ConfigService,
  ) { }

  ngOnInit(): void {
  }

}
