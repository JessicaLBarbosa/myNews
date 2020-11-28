import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AutenticacaoService } from 'src/app/usuario/autenticacao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    public loadingController: LoadingController,
    public autenticacaoService: AutenticacaoService,
    public router: Router,
  ) { }


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

  sairApp() {
    this.autenticacaoService.logoutNoFireBase();
    navigator['app'].exitApp();
  }
}
