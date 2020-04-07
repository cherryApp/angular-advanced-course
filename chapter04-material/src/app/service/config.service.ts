import { Injectable } from '@angular/core';

export interface IMenuItem {
  url: string;
  text: string;
  disabled?: boolean;
  icon?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  menuItems: IMenuItem[] = [
    {url: '/', text: 'Home', icon: 'home'},
    {url: '/basic', text: 'Basic', icon: 'table_chart'},
    {url: '/paginator', text: 'Paginator', icon: 'last_page'},
    {url: '/filter', text: 'Filter', icon: 'filter_list'},
    {url: '/editable', text: 'Editable', icon: 'create'},
  ];

  constructor() { }
}
