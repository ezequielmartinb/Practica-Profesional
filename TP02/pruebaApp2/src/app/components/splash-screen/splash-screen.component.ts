import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class SplashScreenComponent  implements OnInit {

  show = true;

  constructor(private router: Router) {}

  ngOnInit() {
    // El splash dura 3 segundos y luego redirige al home
    setTimeout(() => {
      this.show = false;
      this.router.navigateByUrl('/login', { replaceUrl: true });
    }, 3000);
  }

}
