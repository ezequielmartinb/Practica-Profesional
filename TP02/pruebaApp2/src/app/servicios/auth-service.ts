import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioSubject = new BehaviorSubject<string | null>(null);
  usuario$ = this.usuarioSubject.asObservable();

  constructor() {
    const stored = localStorage.getItem('username');
    if (stored) this.usuarioSubject.next(stored);
  }

  setUsuario(username: string) {
    localStorage.setItem('username', username);
    this.usuarioSubject.next(username);
  }

  getUsuario(): string | null {
    return this.usuarioSubject.getValue();
  }

  logout(): void {
    localStorage.removeItem('username');
    this.usuarioSubject.next(null);
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

}
