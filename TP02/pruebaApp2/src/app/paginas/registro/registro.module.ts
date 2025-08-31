import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegistroPageRoutingModule } from './registro-routing.module';
import { RegistroPage } from './registro.page';
import { HeaderComponent } from "src/app/shared/componentes/header/header.component";
import { LogoComponent } from "src/app/shared/componentes/logo/logo.component";
import { CustomInputComponent } from "src/app/shared/componentes/custom-input/custom-input.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroPageRoutingModule,
    HeaderComponent,
    LogoComponent,
    CustomInputComponent, ReactiveFormsModule
],
  declarations: [RegistroPage]
})
export class RegistroPageModule {}
