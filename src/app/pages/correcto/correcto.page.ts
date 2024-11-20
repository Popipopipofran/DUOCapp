import { Component, OnInit, AfterViewInit, ElementRef, viewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonFooter, IonTabButton, IonIcon } from "@ionic/angular/standalone";

@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
  standalone: true,
})
export class CorrectoPage implements OnInit, AfterViewInit {
  public mensaje: string = '';

  readonly itemTitulo = viewChild.required('titulo', { read: ElementRef });



  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private animationController: AnimationController
  ) {

    this.activatedRoute.queryParams.subscribe(params => {
      const navigation = this.router.getCurrentNavigation();
      if (navigation && navigation.extras.state && navigation.extras.state['mensaje']) {
        this.mensaje = navigation.extras.state['mensaje'];
      } else {
        this.mensaje = 'Mensaje no disponible';
      }
    });
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    const itemTitulo = this.itemTitulo();
    if (itemTitulo) {
      const animation = this.animationController
        .create()
        .addElement(itemTitulo.nativeElement)
        .iterations(Infinity)
        .duration(3000)
        .fromTo('transform', 'translateX(0%)', 'translateX(100%)')
        .fromTo('opacity', 0.2, 1);
      animation.play();
    }
  }
}
