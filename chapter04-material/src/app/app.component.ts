import { Component } from '@angular/core';
import { ConfigService } from './service/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chapter04-material';

  menuItems = this.config.menuItems;

  constructor(
    private config: ConfigService,
  ) {}
}
