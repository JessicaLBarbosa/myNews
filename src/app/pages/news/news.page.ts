import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
import { NewsService } from 'src/app/googlenews/news.service';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/usuario/autenticacao.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
  providers: [NewsService]
})
export class NewsPage implements OnInit {

  public newsList = new Array<any>();
  public page = 1;
  public maxPage:number;
  public resultsPerPage = 20;
  public country:string = "us";
  public category:string = "science";

  constructor(
    public loadingController: LoadingController, 
    public newsService:NewsService, 
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

  infinityScrollEffect(event) {
    setTimeout(() => {
      this.page++;
      this.loadPage();
      console.log('Done');
      event.target.complete();
      if(this.page==this.maxPage){
        event.target.disabled = true;
      }
    }, 4000);
  }

  loadPage() {
    this.newsService.getTopHeadlines(this.country).subscribe(
      data => {
        const response = (data as any);
        this.newsList = this.newsList.concat(response.articles);
        this.maxPage = Math.floor(response.totalResults/this.resultsPerPage);
        if(response.totalResults%this.resultsPerPage!=0){
          this.maxPage++;
          console.log(this.maxPage);
        } 
      }, error => {
        console.log(error);
      }
    );
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
