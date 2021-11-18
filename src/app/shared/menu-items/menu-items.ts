import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: 'students/dashboard', name: 'Dashboard', type: 'link', icon: 'av_timer' },
  { state: 'students/profile', type: 'link', name: 'Profile', icon: 'crop_7_5' },
  { state: 'students/games', type: 'link', name: 'Games', icon: 'view_comfy' }

];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
