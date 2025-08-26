import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { StatusBar } from '@capacitor/status-bar';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

  StatusBar.hide();