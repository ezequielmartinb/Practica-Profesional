import { Component, OnInit } from '@angular/core';
import { AuthService } from './servicios/auth-service';
import { Router } from '@angular/router';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Capacitor } from '@capacitor/core';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit{
  
  usuario: string | null = null;
  mostrarSplashVisual = true;

  constructor(private auth: AuthService, public router: Router) {
    this.configureStatusBar();
  }

  async ngOnInit() {
    // Ocultar splash nativo
    await SplashScreen.hide();

    // Mostrar splash visual por 3 segundos
    setTimeout(() => {
      this.mostrarSplashVisual = false;
    }, 3000);

    // Suscribirse al estado del usuario
    this.auth.usuario$.subscribe(email => {
      this.usuario = email;
    });
  }

  async configureStatusBar() {
    await StatusBar.setOverlaysWebView({ overlay: false });
    await StatusBar.setBackgroundColor({ color: '#ffffff' });
    await StatusBar.setStyle({ style: Style.Dark });
  }  

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
