import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton ],
})
export class HomePage {
  constructor() {}

  async launchVIPC() {
    window.location.href = `${environment.vipc}/sdk?mode=deposit#${environment.devTestOperator.sessionId}`;
  }
}
