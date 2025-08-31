import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment.prod';
import { Preferences } from '@capacitor/preferences';
import { Authservice } from '../servicios/authservice';


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

  constructor(private router:Router, private authService: Authservice) {}

  async submit() {
    const { email, password } = this.form.getRawValue();
  
    try {
      if (!email) {
        this.errorMessage = 'Email inválido';
        return;
      }
      if (!password) {
        this.errorMessage = 'password inválido';
        return;
      }
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });   
  
      if (error || !data?.user) {
        this.errorMessage = 'Credenciales inválidas';      
        return;
      }
  
      // Usuario autenticado correctamente     
      this.authService.setUsuario(email);
      
      this.router.navigate(['/tabs/home']);
    } catch (err) {
      this.errorMessage = 'Error al conectar con el servidor';
      console.error(err);
    }
  }  
}


