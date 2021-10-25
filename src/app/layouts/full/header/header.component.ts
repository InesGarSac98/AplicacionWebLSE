import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {
  constructor(
    private router: Router
  ) {
  }

  public homePulsado(): void {
    this.router.navigate(['/public/home']);

  }
  public AboutUsPulsado(): void {
    this.router.navigate(['/public/aboutus']);

  }
  public LoginPulsado(): void {
    this.router.navigate(['/public/register']);

  }



}
