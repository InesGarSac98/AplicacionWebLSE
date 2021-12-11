import { NgModule } from '@angular/core';

import { MenuItems } from './menu-items/menu-items';
import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from './accordion';
import { ClockComponent } from './clock/clock.component';
import { CommonModule } from '@angular/common';
import { MemoryGameComponent } from './games/memory/memory-game.component';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { Quiz } from './games/quiz/quiz-model';
import { QuizGameComponent } from './games/quiz/quiz-game/quiz-game.component';

const components = [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    ClockComponent,
    MemoryGameComponent,
    QuizGameComponent
]

@NgModule({
  declarations: [
    ...components
  ],
  imports:[
      CommonModule,
      MatIconModule,
      MatGridListModule
  ],
  exports: [
    ...components
   ],
  providers: [ MenuItems ]
})
export class SharedModule { }
