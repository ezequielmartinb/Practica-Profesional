import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { createClient } from '@supabase/supabase-js';
import { AuthService } from 'src/app/servicios/auth-service';
import { environment } from 'src/environments/environment.prod';
import { passwordMatchValidator } from 'src/app/validators/password-match.validator';
import { ToastController } from '@ionic/angular';

const supabase = createClient(environment.apiUrl, environment.publicAnonKey);


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: false
})
export class RegistroPage {

  form: FormGroup;
  errorMessage:string = "";

  constructor(private router:Router, private authService: AuthService, private toastController: ToastController) 
  {
    this.form = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        password2: new FormControl('', [Validators.required]),
      },
      {validators: passwordMatchValidator}      
    )  
  }
  get emailControl(): FormControl {
    return this.form.get('email') as FormControl;
  }
  
  get passwordControl(): FormControl {
    return this.form.get('password') as FormControl;
  }
  
  get password2Control(): FormControl {
    return this.form.get('password2') as FormControl;
  }

  async showToast(message: string, color: 'danger' | 'success' = 'danger') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'top',
      color,
      animated: true
    });
    await toast.present();
  }


  async submit() {
    if (this.form.invalid) return;
    

  
    const { email, password } = this.form.value;
  
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
  
      if (error) {
        if (error.message.includes('User already registered')) {
          await this.showToast('⚠ Este correo ya está registrado.')
        } else {
          this.errorMessage = '⚠ Error al registrar: ' + error.message;
        }
        return;
      }
  
      const user = data.user;
      if (user) {
        // Insertar en la tabla personalizada
        const { error: dbError } = await supabase
          .from('usuarios')
          .insert([
            {
              authId: user.id,  
              correo: email,
              contraseña: password   
            }
          ]);
  
        if (dbError) {
          this.errorMessage = '⚠ Error al guardar en la base de datos: ' + dbError.message;
          return;
        }
  
        this.errorMessage = '';
        console.log('Usuario registrado en DB:', user);
        await this.showToast('✅ ¡Registro exitoso!', 'success');

        // Redirigir después del toast
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      }
    } catch (err) {
      this.errorMessage = '⚠ Error inesperado.';
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
