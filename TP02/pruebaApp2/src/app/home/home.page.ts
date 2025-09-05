import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage{

  usuario: string | null = null;

  constructor(private auth: AuthService, private router: Router) {
    this.auth.usuario$.subscribe(email => {
      this.usuario = email;
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }


}
