import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: 'home', name: 'Home', type: 'link', icon: 'bookmark' },
  { state: 'aboutus', name: 'About us', type: 'link', icon: 'av_timer' },
  { state: 'login', name: 'Login/Register', type: 'link', icon: 'group' },
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
