import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { environment } from 'src/environments/environment';
import { Platform } from '@ionic/angular';
import { registerPlugin } from '@capacitor/core';

export interface VIPCPlugin {
    start(options: { url: string }): Promise<{ url: string }>;
}

const VIPCPlugin = registerPlugin<VIPCPlugin>('VIPCPlugin');

export default VIPCPlugin;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton ],
})
export class HomePage {
  constructor(public platform: Platform) {}

  async launchVIPC() {
    let vipConnectUrl = `${environment.vipc}/sdk?mode=deposit#${environment.devTestOperator.sessionId}`;

    if (this.platform.is('ios')) {
      const { url } = await VIPCPlugin.start({ url: vipConnectUrl }); 
      const urlParams = new URLSearchParams(url.split('?')[1]);
      const transactionId = urlParams.get('transactionId');
      console.log(transactionId);
    }
  }
}
