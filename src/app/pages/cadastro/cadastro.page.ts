import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AutenticacaoService } from 'src/app/usuario/autenticacao.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  public login:string = "";
  public email:string = "";
  public password:string = "";
  public message:string = "";

  constructor(public autenticacaoService: AutenticacaoService, public router: Router, public toastController: ToastController) { }

  ngOnInit() {
  }

  cadastraUsuario() {
    this.autenticacaoService.cadastraNoFirebase(this.email, this.password)
    .then((res) => {
      this.router.navigate(['home']);
    }).catch ((error) => {
      this.message = "Erro ao cadastrar usuário.";
      this.exibeMensagem();
    })
  }

  async exibeMensagem() {
    const toast = await this.toastController.create({
      message: this.message,
      duration: 2000
    });
    toast.present();
  }

}
