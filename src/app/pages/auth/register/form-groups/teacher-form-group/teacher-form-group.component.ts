import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-teacher-form-group',
  templateUrl: './teacher-form-group.component.html',
  styleUrls: ['./teacher-form-group.component.scss']
})
export class TeacherFormGroupComponent implements OnInit {

  constructor() { }
  @Input() public formGroup: FormGroup;

  ngOnInit() {
  }

}
