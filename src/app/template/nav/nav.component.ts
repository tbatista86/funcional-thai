import { Router } from '@angular/router';
import { AuthService } from './../../core/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  events: string[] = [];
  opened: boolean = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('user') !== null) {
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
