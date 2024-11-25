import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ViewWillEnter } from '@ionic/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageComponent } from 'src/app/components/language/language.component';
import { Router } from '@angular/router';
import { colorWandOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons'; 
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/model/user';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { ToastController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service'; // Asegúrate de tener un servicio de base de datos para 

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [
      CommonModule            // CGV-Permite usar directivas comunes de Angular
    , FormsModule             // CGV-Permite usar formularios
    , IonicModule             // CGV-Permite usar componentes de Ionic como IonContent, IonItem, etc.
    , TranslateModule         // CGV-Permite usar pipe 'translate'
    , LanguageComponent // CGV-Lista de idiomas
  ]
})
export class RegistroPage implements ViewWillEnter {

  /** 
   * CGV-INI-Traducciones
   * Para poder utilizar la traducción de textos, se debe:
   *   1. Ejecutar: npm i @ngx-translate/core 
   *   2. Ejecutar: npm i @ngx-translate/http-loader
   *   3. Crear carpeta: src/app/assets/i18n
   *   4. Crear archivo: src/app/assets/i18n/es.json para los textos en español
   *   5. Crear archivo: src/app/assets/i18n/en.json para los textos en inglés
   * 
   * CGV-FIN-Traducciones
  */ 

  @ViewChild('selectLanguage') selectLanguage!: LanguageComponent;

  password2: string = '';
  idNivelEducacional: number | undefined = undefined;
  public user: User = User.emptyUser();
  public nivelesEducacionales = NivelEducacional.getNivelesEducacionales();
  public showCalendar: boolean = false;

  constructor(private router: Router, private toast: ToastController, private db: DatabaseService) {
    // this.password2 = '123';
    // this.user = {
    //   userName: 'saul',
    //   email: 'saulvega@gmail.com',
    //   password: '123',
    //   secretQuestion: 'si?',
    //   secretAnswer: 'no',
    //   firstName: 'saul',
    //   lastName: 'vega',
    //   educationalLevel: NivelEducacional.getNivelEducacionalById(1)!,
    //   dateOfBirth: new Date(),
    //   address: 'calle 123',
    //   image: ''
    // }
  }

  async ionViewWillEnter() {
    this.selectLanguage.setCurrentLanguage();
  }

  public cambiarNivelEducacional(event: any): void {
    this.idNivelEducacional = event?.detail?.value;
    const nivelEducacional = NivelEducacional.getNivelEducacionalById(this.idNivelEducacional);
    if (nivelEducacional instanceof NivelEducacional) {
      this.user.educationalLevel = nivelEducacional;
    }
  }

  navigateTheme() {
    this.router.navigate(['/theme']);
  }

  toggleCalendar() {
    this.showCalendar = !this.showCalendar;
  }

  async registerNewUser(): Promise<void> {
    if (this.password2 !== this.user.password) {
      const toast = await this.toast.create({
        message: 'Las contraseñas no coinciden.',
        duration: 2000,
        position: 'bottom',
        color: 'danger'
      });
      toast.present();
      return;
    }
    try {
      const user = await User.getNewUsuario(
        this.user.userName,
        this.user.email,
        this.user.password,
        this.user.secretQuestion,
        this.user.secretAnswer,
        this.user.firstName,
        this.user.lastName,
        this.user.educationalLevel,
        new Date(this.user.dateOfBirth),
        this.user.address,
        '',
      );
      console.log('Usuario a', user);
      console.log('Usuario b', this.user);
      const user1 = await this.db.readUser(user.userName);
      if (!user1) {
        await this.db.saveUser(user);
        const toast = await this.toast.create({
          message: 'Usuario registrado correctamente.',
          duration: 2000,
          position: 'bottom',
          color: 'success'
        });
        toast.present();
      } else {
        const toast = await this.toast.create({
          message: 'El username ya existe.',
          duration: 2000,
          position: 'bottom',
          color: 'warning'
        });
        toast.present();
      }
    } catch (error) {
      console.log(error)
      const toast = await this.toast.create({
        message: 'Error al registrar el usuario.',
        duration: 2000,
        position: 'bottom',
        color: 'danger'
      });
      toast.present();
    }
  }

  login() {
    console.log('Navegando a la página de registro');
    this.router.navigate(['/login']);
  }

  showMap() {
    this.router.navigate(['/map']);
  }

}
