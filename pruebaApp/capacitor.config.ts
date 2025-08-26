import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'ionic-app-base',
  webDir: 'www',
  plugins: {
    StatusBar: {
      style: 'DARK', // o 'LIGHT' según tu diseño
      backgroundColor: '#ffffff', // color de fondo de la barra de estado
      overlaysWebView: false // 👈 evita la superposición del sistema
    },
    SplashScreen: {
      launchShowDuration: 0 // opcional, si usás splash personalizado
    }
  },
  android: {
    backgroundColor: '#ffffff' // asegura consistencia visual
  }

};

export default config;
