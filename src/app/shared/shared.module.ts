import { NgModule } from '@angular/core';

import { MenuItems } from './menu-items/menu-items';
import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from './accordion';
import { ClockComponent } from './clock/clock.component';
import { CommonModule } from '@angular/common';

const components = [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    ClockComponent
]

@NgModule({
  declarations: [
    ...components
  ],
  imports:[
      CommonModule
  ],
  exports: [
    ...components
   ],
  providers: [ MenuItems ]
})
export class SharedModule { }
