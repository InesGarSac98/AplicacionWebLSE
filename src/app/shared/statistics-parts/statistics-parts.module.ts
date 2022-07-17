import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentStatisticsComponent } from './student-statistics/student-statistics.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { StudentLearnedWordsChartComponent } from './student-learned-words-chart/student-learned-words-chart.component';

const components = [
    StudentStatisticsComponent,
    StudentLearnedWordsChartComponent
];

@NgModule({
  imports: [
    CommonModule,
    NgxChartsModule
  ],
  declarations: [
    ...components
  ],
  exports: [
    ...components
  ]
})
export class StatisticsPartsModule { }
