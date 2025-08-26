import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment.prod';

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

  submit() 
  {
    const { email, password } = this.form.getRawValue();

    supabase
      .from('usuarios')
      .select('*')
      .eq('correo', email)
      .single()
      .then(({ data, error }) => {
        if (error || !data) 
        {
          this.errorMessage = 'Usuario no encontrado'
          return;
        }
        // ⚠️ Comparación insegura (solo para pruebas)
        if (data.contraseña === password) 
        {
          this.router.navigate(['/tabs/tab2']);
        } 
        else 
        {
          this.errorMessage = 'Contraseña incorrecta';
        }
      });
  }
}


