import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { createClient } from '@supabase/supabase-js';
import { AuthService } from 'src/app/servicios/auth-service';
import { environment } from 'src/environments/environment.prod';

const supabase = createClient(environment.apiUrl, environment.publicAnonKey);


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  form = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    }
  );
  errorMessage:string = "";

  constructor(private router:Router, private authService: AuthService) {}

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
      console.log("Email: ", email);
      console.log("password: ", password);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });   
  
      if (error || !data?.user) {
        this.errorMessage = 'Credenciales inválidas';      
        console.log(error);
        
        return;
      }  
      // Usuario autenticado correctamente     
      this.authService.setUsuario(email);      
      this.router.navigate(['/home']);
      
    } catch (err) {
      this.errorMessage = 'Error al conectar con el servidor';
      console.error(err);
    }
  } 
  ionViewWillEnter() {
    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.errorMessage = '';
  }
}
