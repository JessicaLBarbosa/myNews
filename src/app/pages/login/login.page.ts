import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AutenticacaoService } from 'src/app/usuario/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public email:string = "";
  public password:string = "";
  public message:string = "";

  constructor(public autenticacaoService: AutenticacaoService, public router: Router, public toastController: ToastController) { }

  ngOnInit() {
  }

  loginUsuario() {
    this.autenticacaoService.loginNoFirebase(this.email, this.password)
    .then((res) => {
      this.router.navigate(['home']);
    }).catch ((error) => {
      this.message = "Email e/ou senha incorreto.";
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

  showPassword() {
    //document.getElementsById("password").setAttribute("type", "text");
  }

}
