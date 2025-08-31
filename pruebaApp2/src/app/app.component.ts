import { Component } from '@angular/core';
import { AuthService } from './servicios/auth-service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  
  usuario: string | null = null;

  constructor(private auth:AuthService) {}
  ngOnInit() {
    this.auth.usuario$.subscribe(email => {
      this.usuario = email;
    });   
  }
}
