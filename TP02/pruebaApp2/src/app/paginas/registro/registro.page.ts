import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { createClient } from '@supabase/supabase-js';
import { AuthService } from 'src/app/servicios/auth-service';
import { environment } from 'src/environments/environment.prod';

const supabase = createClient(environment.apiUrl, environment.publicAnonKey);


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: false
})
export class RegistroPage {

  form = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password2: new FormControl('', [Validators.required]),
    }
  );
  errorMessage:string = "";

  constructor(private router:Router, private authService: AuthService) {}

  async submit() {
    
  } 
  ionViewWillEnter() {
    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.errorMessage = '';
  }

}
