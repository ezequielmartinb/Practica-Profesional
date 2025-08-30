import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment.prod';
import { Preferences } from '@capacitor/preferences';


const supabase = createClient(environment.apiUrl, environment.publicAnonKey);

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  form = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    }
  );
  errorMessage:string = "";

  constructor(private router:Router) {}

  async submit() {
    const { email, password } = this.form.getRawValue();
  
    try {
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('correo', email)
        .single();
  
      if (error || !data) {
        this.errorMessage = 'Usuario no encontrado';
        return;
      }
  
      // ⚠️ Comparación insegura (solo para pruebas)
      if (data.contraseña === password) {
        await Preferences.set({
          key: 'email',
          value: email ?? '',
        });
  
        this.router.navigate(['/tabs/home']);
      } else {
        this.errorMessage = 'Contraseña incorrecta';
      }
    } catch (err) {
      this.errorMessage = 'Error al conectar con el servidor';
      console.error(err);
    }
  }
  
}


