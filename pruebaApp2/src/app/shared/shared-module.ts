import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './componentes/header/header.component';
import { LogoComponent } from './componentes/logo/logo.component';
import { CustomInputComponent } from './componentes/custom-input/custom-input.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule, HeaderComponent, LogoComponent, CustomInputComponent
  ],
  exports: [
    HeaderComponent, LogoComponent, CustomInputComponent
  ]
})
export class SharedModule { }
