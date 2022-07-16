import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentStatisticsComponent } from './student-statistics/student-statistics.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

const components = [
    StudentStatisticsComponent
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
