import { NgModule } from '@angular/core';
import { MenuItems } from './menu-items/menu-items';
import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from './accordion';
import { ClockComponent } from './clock/clock.component';
import { CommonModule } from '@angular/common';
import { MemoryGameComponent } from './games/memory/memory-game.component';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { QuizzGameComponent } from './games/quiz/quiz-game/quizz-game.component';
import { MatCardModule } from '@angular/material/card';
import { TwoSideMultiSelectComponent } from './two-side-multi-select/two-side-multi-select/two-side-multi-select.component';
import { ScrollingModule} from '@angular/cdk/scrolling';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { GameTimerComponent } from './game-timer/game-timer.component';
import { MatExpansionModule } from '@angular/material/expansion';

const components = [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    ClockComponent,
    MemoryGameComponent,
    QuizzGameComponent,
    TwoSideMultiSelectComponent,
    GameTimerComponent
]

@NgModule({
  declarations: [
    ...components
  ],
  imports:[
      CommonModule,
      MatIconModule,
      MatButtonModule,
      MatGridListModule,
      MatCardModule,
      ScrollingModule,
      MatCheckboxModule,
      FormsModule,
      MatRadioModule,
      MatTableModule,
      MatPaginatorModule,
      MatInputModule,
      MatProgressBarModule,
      MatExpansionModule
  ],
  exports: [
    ...components
   ],
  providers: [ MenuItems ]
})
export class SharedModule { }
