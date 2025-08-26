import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: false,
})
export class TabsPage implements OnInit {
  
  usuario:string = "";

  constructor() {}

  ngOnInit() 
  {
    if(localStorage.getItem("usuario"))
    {
      this.usuario = localStorage.getItem("usuario")!;
    }    
  }
}