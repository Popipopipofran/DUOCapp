import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { User } from 'src/app/model/user';
import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { AnimationController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
})
export class PreguntaPage implements OnInit {
  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;

  public usuario?: Usuario; 
  public respuesta: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private loadingController: LoadingController,
    private animationController: AnimationController,
    private toastController: ToastController
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      const navigation = this.router.getCurrentNavigation();
      if (navigation && navigation.extras.state && navigation.extras.state['usuario']) {
        this.usuario = navigation.extras.state['usuario'];
      } else {
        this.router.navigate(['/login']);
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

  ngOnInit() { }

  public async validarRespuestaSecreta(): Promise<void> {

    const loading = await this.loadingController.create({
      message: 'Validando respuesta...',
    });
    await loading.present();


    if (this.usuario && this.usuario.respuestaSecreta === this.respuesta) {

      await loading.dismiss();


      const toast = await this.toastController.create({
        message: 'Respuesta correcta. Redirigiendo...',
        duration: 2000,
        color: 'success',
      });
      toast.present();

      // esta es la pagina COOORRECCCTOOOOO 
      const navigationExtras: NavigationExtras = {
        state: {
          mensaje: 'Tu contraseña es ' + this.usuario.password,
        },
      };
      this.router.navigate(['/correcto'], navigationExtras);
    } else {
    
      await loading.dismiss();

      // esto es el mensaje de erroooooooraaaaaaaaaaaaaaaaa
      const toast = await this.toastController.create({
        message: 'Respuesta incorrecta. Intenta nuevamente.',
        duration: 2000,
        color: 'danger',
      });
      toast.present();

      // esto es la pagina incorreccctooo y se supone que muestra el mensaje d error
      const navigationExtras: NavigationExtras = {
        state: {
          mensaje: '¡Lo sentimos, pero los datos ingresados no son correctos!',
        },
      };
      this.router.navigate(['/incorrecto'], navigationExtras);
    }
  }
}
