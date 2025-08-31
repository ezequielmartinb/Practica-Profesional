import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';
import { HeaderComponent } from "src/app/shared/componentes/header/header.component";
import { LogoComponent } from "src/app/shared/componentes/logo/logo.component";
import { CustomInputComponent } from "src/app/shared/componentes/custom-input/custom-input.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    HeaderComponent,
    LogoComponent,
    CustomInputComponent, ReactiveFormsModule
],
  declarations: [LoginPage]
})
export class LoginPageModule {}
