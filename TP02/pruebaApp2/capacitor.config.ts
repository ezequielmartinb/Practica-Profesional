import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.emb.app',
  appName: 'PruebaApp',
  webDir: 'www',
  plugins:
  {
    
    SplashScreen: {
      launchShowDuration: 0,
      launchAutoHide: true,
      launchFadeOutDuration: 3000,
      backgroundColor: "#ffffffff",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#999999",
      splashFullScreen: false,
      splashImmersive: false,
      layoutName: "launch_screen",
      useDialog: false
    },  
    StatusBar:
    {
      overlaysWebView: false,
      backgroundColor: '#ffffff', // fondo blanco para la barra
      style: 'DARK',          // texto oscuro (ideal si el fondo es claro)
    }
  }

};

export default config;
