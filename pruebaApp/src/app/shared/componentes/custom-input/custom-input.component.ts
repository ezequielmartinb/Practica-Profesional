import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonIcon, IonLabel, IonInput, IonItem } from "@ionic/angular/standalone";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class CustomInputComponent  implements OnInit {

  @Input() control!:FormControl;
  @Input() type!:string;
  @Input() label!:string;
  @Input() autocomplete!:string;
  @Input() icon!:string;

  isPassword!:boolean;
  hide:boolean = true;
  
  constructor() { }

  ngOnInit() 
  {
    if(this.type == 'password')
    {
      this.isPassword = true;
    }
  }

  showOrHidePassword()
  {
    this.hide = !this.hide;
    if(this.hide)
    {
      this.type = "password";
    }
    else
    {
      this.type = "text";
    }
  }

}
