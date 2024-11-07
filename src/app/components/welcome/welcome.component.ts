import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { User } from 'src/app/model//user';
import { AuthService } from 'src/app/services/auth.service';
import { QrWebScannerComponent } from '../qr-web-scanner/qr-web-scanner.component';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  standalone: true,
  imports: [TranslateModule,QrWebScannerComponent]
})
export class WelcomeComponent implements OnInit {

  user: User = new User();

  constructor(private auth: AuthService) { 
    this.auth.authUser.subscribe((user) => {
      console.log(user);
      if (user) {
        this.user = user;
      }
    });
  }

  ngOnInit() {}

}
