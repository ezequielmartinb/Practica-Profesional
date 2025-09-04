import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
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
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  errorMessage: string = '';
  usuariosDemo: any[] = [];
  isLoading:boolean = false;
  isLoadingUsuarios:boolean = false;
  

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {
    this.cargarUsuariosDemo();
  }

  ionViewWillEnter() {
    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.errorMessage = '';
  }

  async presentLoader(message: string = 'Cargando...') {
    const loader = await this.loadingController.create({
      message,
      spinner: 'crescent',
      cssClass: 'custom-loader',
      translucent: true,
      duration: 10000,
    });
    await loader.present();
    return loader;
  }

  async showToast(message: string, color: 'danger' | 'success' = 'danger') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'top',
      color,
      animated: true,
    });
    await toast.present();
  }

  async submit() {
    const { email, password } = this.form.getRawValue();
    const loader = await this.presentLoader('Iniciando sesión...');
    this.isLoading = true;

    try {
      if (!email || !password) {
        this.errorMessage = '⚠ Credenciales incompletas';
        await loader.dismiss();
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      await loader.dismiss();

      if (error || !data?.user) {
        await this.showToast('⚠ Credenciales inválidas');
        return;
      }

      this.authService.setUsuario(email);
      this.router.navigate(['/home']);
    } catch (err) {
      await loader.dismiss();
      this.errorMessage = 'Error al conectar con el servidor';
      console.error(err);
    }
  }

  async loginRapido(correo: string) {
    const loader = await this.presentLoader('Accediendo...');

    try {
      const usuario = this.usuariosDemo.find(u => u['correo'] === correo);
      const password = usuario?.['contraseña'];

      if (!usuario || !password) {
        await loader.dismiss();
        await this.showToast('⚠ Usuario o contraseña no disponible');
        return;
      }

      const { error: authError } = await supabase.auth.signInWithPassword({
        email: correo,
        password: password,
      });

      await loader.dismiss();

      if (authError) {
        await this.showToast('⚠ Error de autenticación');
        return;
      }

      this.authService.setUsuario(correo);
      this.router.navigate(['/home']);
    } catch (err: any) {
      await loader.dismiss();
      console.error('Error en login rápido:', err.message);
      await this.showToast('⚠ Error inesperado');
    }
  }

  async cargarUsuariosDemo() {
    this.isLoadingUsuarios = true;

    const { data, error } = await supabase
      .from('usuarios')
      .select('correo, "contraseña"') // comillas para evitar error de parser
      .neq('correo', '')
      .order('correo', { ascending: true });

    if (error) {
      console.error('Error al cargar usuarios demo:', error.message);
      return;
    }

    const correosUnicos = Array.from(
      new Map(data.map(u => [u['correo'], u])).values()
    );

    this.usuariosDemo = correosUnicos;
    this.isLoadingUsuarios = false;

  }

}
