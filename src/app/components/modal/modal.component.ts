import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { LoginUsuario } from 'src/app/models/login-usuario';



@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']

})
export class ModalComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  loginUsuario: LoginUsuario;
  nombreUsuario: string;
  password: string;
  roles: string[] = [];
  form: FormGroup;

  constructor(
    
    private formBuilder: FormBuilder,
    private autenticacionService: AutenticacionService,
    private ruta2: Router,
    private tokenService: TokenService) {

    this.form = this.formBuilder.group(
      {
        nombreUsuario: ['', [Validators.required]],
        password: ['', [Validators.required]]
      }
    )
  }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  get NombreUsuario() {
    return this.form.get('nombreUsuario'); 
  }

  get Password() {
    return this.form.get('password');
  }

  

  onEnviar(event: Event) {
    
    event.preventDefault;
    this.loginUsuario=new LoginUsuario(this.nombreUsuario, this.password);
    this.autenticacionService.IniciarSesion(this.form.value).subscribe(data => {
      this.isLogged = true;
      this.isLoginFail = true;
      this.tokenService.setToken(data.token);
      this.tokenService.setUserName(data.nombreUsuario);
      this.tokenService.setAuthorities(data.authorities);
      this.roles = data.authorities;
      console.log("TOKEN:" + JSON.stringify(data));
      this.ruta2.navigate(['home']);


    })
  }

}
