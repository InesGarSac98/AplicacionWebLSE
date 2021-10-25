import { MediaMatcher } from '@angular/cdk/layout';
import {ChangeDetectorRef, Component,OnDestroy,AfterViewInit} from '@angular/core';
import { MenuItems } from '../../shared/menu-items/menu-items';


/** @title Responsive sidenav */
@Component({
  selector: 'app-full-layout',
  templateUrl: 'full.component.html',
  styleUrls: []
})
export class FullComponent implements OnDestroy, AfterViewInit {


  constructor(  ) {}
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngAfterViewInit() {}
}
