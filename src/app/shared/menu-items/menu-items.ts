import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: 'students/profile', type: 'link', name: 'Profile', icon: 'school' },
  { state: 'students/games', type: 'link', name: 'Games', icon: 'casino' },
  { state: 'students/progress', type: 'link', name: 'Progress', icon: 'poll' },
  { state: 'students/review', type: 'link', name: 'Review', icon: 'sync' }

];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
