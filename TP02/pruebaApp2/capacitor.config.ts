import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.emb.app',
  appName: 'PruebaApp',
  webDir: 'www',
  plugins:
  {  
    StatusBar: {
      overlaysWebView: false, // 👈 evita que el contenido se meta debajo de la barra
      style: 'DARK',          // texto oscuro (ideal si el fondo es claro)
      backgroundColor: '#ffffff', // fondo blanco para la barra
    },  
    SplashScreen: {
      backgroundColor: "#1e3c72",
      showSpinner: false,
      launchShowDuration: 3000
    }
  }

};

export default config;
