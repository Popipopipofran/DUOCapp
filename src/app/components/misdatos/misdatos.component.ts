import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { AnimationController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { IonFabButton, IonFab, IonList, IonCardContent, IonHeader
  , IonToolbar, IonTitle, IonCard, IonCardHeader, IonCardTitle
  , IonCardSubtitle, IonItem, IonLabel, IonInput, IonTextarea
  , IonGrid, IonRow, IonCol, IonButton, IonIcon, IonContent
  , IonFabList, IonSelectOption } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-misdatos',
  templateUrl: './misdatos.component.html',
  styleUrls: ['./misdatos.component.scss'],
  standalone: true,
  imports: [IonList, IonHeader, IonToolbar, IonTitle, IonCard
    , IonCardHeader, IonCardTitle, IonCardSubtitle, IonItem
    , IonLabel, IonInput, IonTextarea, IonGrid, IonRow, IonCol
    , IonButton, IonIcon, IonContent, IonCardContent
    , IonFab, IonFabButton, IonFabList
    , CommonModule, FormsModule, IonSelectOption]
})
export class MisdatosComponent implements OnInit, AfterViewInit {
  user: User = new User();

  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;

  ngOnInit() {
    console.log(this.user.educationalLevel);
   }

  

  constructor(
    private userService: UserService,
    private loadingController: LoadingController,
    private animationController: AnimationController,
    private auth: AuthService,
    private toastController: ToastController
  ) {
    this.auth.authUser.subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.itemTitulo) {
      const animation = this.animationController
        .create()
        .addElement(this.itemTitulo.nativeElement)
        .iterations(Infinity)
        .duration(6000)
        .fromTo('transform', 'translate(0%)', 'translate(100%)')
        .fromTo('opacity', 0.2, 1);
      animation.play();
    }
  }

  cambiarNombre(event: any) {
    this.user.firstName = event;
  }

  cambiarApellido(event: any) {
    this.user.lastName = event;
  }

  cambiarCorreo(event: any) {
    this.user.email = event;
  }

  limpiarFormulario() {
    this.user = new User();
  }

  mostrarDatosUsuario() {
    console.log('Datos del usuario cargados:', this.user);
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000, // Duración en milisegundos
      position: 'bottom', // Posición del toast
      color: 'success' // Cambia a 'danger' si es un mensaje de error
    });
    toast.present();
  }

  actualizarDatos(): void {
    const usuarioActualizado = {
      correo: this.user.email,
      nombre: this.user.firstName,
      apellido: this.user.lastName,
      preguntaSecreta: this.user.secretQuestion || '',
      respuestaSecreta: this.user.secretAnswer || '',
      direccion: this.user.address || '',
      contraseña: this.user.password || '',
    };

    const actualizado = (usuarioActualizado);


    
    if (actualizado) {
      this.mostrarToast('Datos actualizados correctamente.');
    } else {
      this.mostrarToast('Error al actualizar los datos.');
    }
  }

  get nombreUsuario(): string {
    return this.user.email.split('@')[0];
  }

  // Método para formatear la fecha en dd-mm-yyyy
  formatFechaNacimiento(date: string): string {
    const dateObj = new Date(date);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${day}-${month}-${year}`;
  }
}
