import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

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
