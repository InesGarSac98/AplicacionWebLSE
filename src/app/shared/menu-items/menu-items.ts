import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'av_timer' },
  { state: 'home', type: 'link', name: 'Home', icon: 'crop_7_5' },
  { state: 'aboutus', type: 'link', name: 'Aboutus', icon: 'view_comfy' },
  { state: 'login', type: 'link', name: 'Login', icon: 'view_list' },
  { state: 'register', type: 'link', name: 'Register', icon: 'view_headline' },

];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
