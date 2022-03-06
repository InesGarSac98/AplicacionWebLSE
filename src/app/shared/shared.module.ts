import { NgModule } from '@angular/core';
import { MenuItems } from './menu-items/menu-items';
import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from './accordion';
import { ClockComponent } from './clock/clock.component';
import { CommonModule } from '@angular/common';
import { MemoryGameComponent } from './games/memory/memory-game.component';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { QuizGameComponent } from './games/quiz/quiz-game/quiz-game.component';
import { MatCard, MatCardModule } from '@angular/material/card';
import { TwoSideMultiSelectComponent } from './two-side-multi-select/two-side-multi-select/two-side-multi-select.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectionList } from '@angular/material/list';
import { FilterViewNamePipe } from './pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { FilterCheckedStatePipe } from './pipes/filterCheckedState/filter-checked-state.pipe';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DictionaryComponent } from './dictionary/dictionary.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { GameTimerComponent } from './game-timer/game-timer.component';

const components = [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    ClockComponent,
    MemoryGameComponent,
    QuizGameComponent,
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
      MatProgressBarModule
  ],
  exports: [
    ...components
   ],
  providers: [ MenuItems ]
})
export class SharedModule { }
