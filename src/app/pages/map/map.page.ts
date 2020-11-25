import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AutenticacaoService } from 'src/app/usuario/autenticacao.service';
import {Map, tileLayer, marker} from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {


  constructor(
    public loadingController: LoadingController,
    public autenticacaoService: AutenticacaoService,
    public router: Router,
  ) { }

  ngOnInit() {
  }

  async loadingEffect () {
    const loading = await this.loadingController.create ({
      message: 'Carregando Map',
      duration: 1000,
      spinner: "lines"
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
  }


    ionViewDidEnter () {
      this.loadingEffect();
    }

    logoutUsuario() {
      this.autenticacaoService.logoutNoFireBase()
      this.router.navigate(['login']);
  
    }
}
