// src/app/services/user.service.ts

import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usuarioAutenticado: User | null = null;

  // Guardar el usuario autenticado
  setUsuarioAutenticado(usuario: User) {
    this.usuarioAutenticado = usuario;
  }

  // Obtener el usuario autenticado
  obtenerUsuarioAutenticado(): User | null {
    const storedUser = sessionStorage.getItem('usuario');
    if (storedUser) {
      const usuario = JSON.parse(storedUser);
      this.setUsuarioAutenticado(usuario);
    }
    return this.usuarioAutenticado;
  }

  actualizarUsuario(usuarioActualizado: User): boolean {
    if (this.usuarioAutenticado?.email === usuarioActualizado.email) {
      this.usuarioAutenticado = usuarioActualizado;  // Actualiza el usuario autenticado en memoria
      sessionStorage.setItem('usuario', JSON.stringify(usuarioActualizado));
      return true;
    }
    return false;
  }
}