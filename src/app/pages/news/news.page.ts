import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/usuario/autenticacao.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],

})
export class NewsPage implements OnInit {

  constructor(
    public autenticacaoService: AutenticacaoService,
    public router: Router,
  ) { }

  ionViewDidEnter () {
  }

  ngOnInit() {
  }

  logoutUsuario() {
    this.autenticacaoService.logoutNoFireBase()
    this.router.navigate(['login']);

  }
}
