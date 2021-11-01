import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-student-form-group',
  templateUrl: './student-form-group.component.html',
  styleUrls: ['./student-form-group.component.scss']
})
export class StudentFormGroupComponent implements OnInit {

  constructor() { }
  @Input() public formGroup: FormGroup;

  public ngOnInit() {
  }

}
