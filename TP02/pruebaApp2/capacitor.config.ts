import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'ionic-app-base',
  webDir: 'www',
  plugins:
  {
    StatusBar:
    {
      overlaysWebView: false,
      backgroundColor: '#ffffff', // fondo blanco para la barra
      style: 'DARK',          // texto oscuro (ideal si el fondo es claro)
    }
  }

};

export default config;
