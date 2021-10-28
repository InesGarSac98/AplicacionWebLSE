import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']

})
export class PublicComponent implements OnInit {


  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  public homePulsado(): void {
    this.router.navigate(['/public/home']);

  }
  public AboutUsPulsado(): void {
    this.router.navigate(['/public/aboutus']);

  }
  public LoginPulsado(): void {
    this.router.navigate(['/public/login']);

  }

  ngOnDestroy(): void {

  }
  ngAfterViewInit() {}


}
