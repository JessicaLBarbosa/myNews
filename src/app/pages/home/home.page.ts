import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(public loadingController: LoadingController) { }

  async loadingEffect () {
    const loading = await this.loadingController.create ({
      message: 'Carregando Informação',
      duration: 1000,
      spinner: "lines"
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
  }

    ionViewDidEnter () {
      this.loadingEffect();
    }

  ngOnInit() {
  }

}
