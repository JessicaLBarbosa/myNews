import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { NewsService } from 'src/app/googlenews/news.service';
import { AutenticacaoService } from 'src/app/usuario/autenticacao.service';

import { LoadingController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
  providers:[NewsService]
})
export class NewsPage implements OnInit {

  constructor(
    public autenticacaoService: AutenticacaoService,
    public router: Router,
    public newsService:NewsService,
    public loadingController: LoadingController
  ) { }

  public lista_news = new Array<any>();
  public page:number = 1;

  loadPage () {
    this.newsService.getTopHeadlines('us', this.page).subscribe (
      data => {
        const response = (data as any);
        if (this.page == 1){
          this.lista_news = response.articles;
        } else {
          this.lista_news = this.lista_news.concat(response.articles);
        }
        console.log(this.lista_news);
      },
      error => {
        console.log(error);
      }
    )
  }

  async loadingEffect(){
    const loading = await this.loadingController.create({
      spinner: "dots",
      message: 'Carregando notícias',
      duration: 1000
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
  }

  refreshEffect (event) {
    this.page = 1;
    this.loadPage();
    console.log('Iniciando operação assíncrona');

    setTimeout (() => {
      event.target.complete();
      console.log('Finalizando refresh');
    }, 500);
  }

  infScrollEffect(event) {
    this.page++;
    this.loadPage();
    setTimeout(() => {
      event.target.complete();
    }, 1000)
  }

  ionViewDidEnter () {
    this.loadingEffect();
    this.loadPage();
  }

  ngOnInit() {
  }

  logoutUsuario() {
    this.autenticacaoService.logoutNoFireBase()
    this.router.navigate(['login']);

  }
}
