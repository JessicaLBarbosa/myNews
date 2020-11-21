import { Component, OnInit } from '@angular/core';
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

  constructor(
    public newsService:NewsService, 
    public autenticacaoService: AutenticacaoService,
    public router: Router,
  ) { }

  public newsList = new Array<any>();
  public page = 1;
  public maxPage:number;
  public resultsPerPage = 20;
  public country:string = "us";
  public category:string = "science";

  loadPage() {
    this.newsService.getTopHeadlines('us').subscribe(
      data => {
        const response = (data as any);
        this.newsList = this.newsList.concat(response.articles);
        console.log(this.newsList);
      }, error => {
        console.log(error);
      }
    );
  }

  ionViewDidEnter () {
    this.loadPage();
  }

  ngOnInit() {
  }

  logoutUsuario() {
    this.autenticacaoService.logoutNoFireBase()
    this.router.navigate(['login']);

  }
}
