import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
  
})
export class PublicComponent implements OnInit {
 

  constructor() { }
  
  ngOnInit() {
  }
  @Output() sidenavClose = new EventEmitter();
  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

}
