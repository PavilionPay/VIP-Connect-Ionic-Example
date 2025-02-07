import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { environment } from 'src/environments/environment';
import { Platform } from '@ionic/angular';
import { registerPlugin } from '@capacitor/core';

export interface VIPCPlugin {
    start(options: { url: string }): Promise<{ value: string }>;
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
    let url = `${environment.vipc}/sdk?mode=deposit#${environment.devTestOperator.sessionId}`;

    if (this.platform.is('android')) { 
      // await InAppBrowser.openInSystemBrowser({ 
      //   url:'https://qa.api-gaming.paviliononline.io/sdk?mode=deposit#0502bf21-32bd-49e4-8f2c-e7bec67c7676',
      //   options: DefaultSystemBrowserOptions
      // });
      // await InAppBrowser.addListener('browserClosed', () => {
      //   console.log('Browser closed');
      // });
    }

    if (this.platform.is('ios')) {
      const { value } = await VIPCPlugin.start({ url: 'https://qa.api-gaming.paviliononline.io/sdk?mode=deposit#1d9cd474-75a0-4220-9704-761261afe988' }); 
      console.log(value);
    }
  }
}
