import { Component } from '@angular/core';
import { AuthService } from './servicios/auth-service';
import { Router } from '@angular/router';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Capacitor } from '@capacitor/core';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  
  usuario: string | null = null;

  constructor(private auth:AuthService, private router: Router) 
  {
    this.showSplash();
    this.configureStatusBar();
  }

  async configureStatusBar() {
    if (Capacitor.isNativePlatform()) {
      try {
        await StatusBar.setOverlaysWebView({ overlay: false });
        await StatusBar.setStyle({ style: Style.Light });
        await StatusBar.setBackgroundColor({ color: '#ffffff' });
      } catch (_) {
        console.warn('StatusBar no disponible en esta plataforma');
      }
    }    
  }
  
  
  ngOnInit() {
    this.auth.usuario$.subscribe(email => {
      this.usuario = email;
    });   
  }
  
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
  async showSplash()
  {
    await SplashScreen.show({
      autoHide: true,
      showDuration: 3000
    });
  }

}
