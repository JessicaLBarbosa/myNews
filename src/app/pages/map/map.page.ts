import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AutenticacaoService } from 'src/app/usuario/autenticacao.service';

import { Map, tileLayer, marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  map:Map;
  newMarker:any;

  constructor(
    public loadingController: LoadingController,
    public autenticacaoService: AutenticacaoService,
    public router: Router,
    private geoLocation: Geolocation,
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
      this.loadMap();
    }

    logoutUsuario() {
      this.autenticacaoService.logoutNoFireBase()
      this.router.navigate(['login']);
  
    }

    loadMap() {
      this.map = new Map("mapId").setView([-22.8418837,-43.2667373], 15);

      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
    }

    pegarLocalizacao() {
      this.geoLocation.getCurrentPosition().then(
        (resp) => {
          this.map.setView([resp.coords.latitude, resp.coords.longitude], 17);
          this.newMarker = marker([resp.coords.latitude, resp.coords.longitude], { draggable: false }).addTo(this.map);
          this.newMarker.bindPopup("You're Here!").openPopup();
  
          console.log(resp.coords.latitude + " " + resp.coords.longitude);
        }
      ).catch(
        (error) => {
          console.log("Erro ao capturar a localização", error);
        }
      );
    }
}
