import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  public logout(): void {
    this.router.navigateByUrl('/auth/login');
    localStorage.removeItem('token');
  }
}
