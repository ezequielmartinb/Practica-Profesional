import { Component } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

  usuario: string = '';

  async ngOnInit() {
    const { value } = await Preferences.get({ key: 'email' });
    if (value) {
      this.usuario = value;
    }
  }



}
