import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Experiencia } from 'src/app/models/experiencia';
import { of } from 'rxjs';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { TokenService } from 'src/app/services/token.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  // experiencia: Experiencia[] = [];
  // roles: string[];
  // isAdmin = false;
  // isLogged = false;
  form: FormGroup;
  [x: string]: any;
  experiencia: any;
  isLogged = false;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private autenticacionService: AutenticacionService,
    private ruta2: Router,
    private tokenService: TokenService,
    private datosExperiencia: ExperienciaService
  ) {
    // this.form = this.formBuilder.group(
    //   {
    //     empresa: ['', [Validators.required]],
    //     detalle: ['', [Validators.required]],
    //     periodo: ['', [Validators.required]]
    //   }
    // )
  }

  ngOnInit() {

    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;

    }
    
    this.datosExperiencia.obtenerDatos().subscribe(data => {
      console.log(data);
      this.experiencia = data;
    });
  }
  // if (this.tokenService.getToken()) {
  //   this.isLogged = true;
  // } else {
  //   this.isLogged = false;

  //   }

  //   this.cargarExp();
  //   this.roles = this.tokenService.getAuthorities();
  //   this.roles.forEach(rol => {
  //     if (rol === 'ROLE_ADMIN') {
  //       this.isAdmin = true;
  //     }
  //   });
  // }

  // cargarExp(): void {
  //   this.datosExperiencia.list().subscribe({
  //     next: data => {
  //       this.experiencia = data;
  //     },
  //     error: err => {
  //       console.log(err);
  //     }
  //   });
  // }

  // borrar(id: number) {
  //   this.datosExperiencia.delete(id).subscribe(data => {
  //     this.toastr.success('Experiencia eliminada', 'OK', {
  //       timeOut: 3000, positionClass: "toast-top-center"
  //     });
  //     this.cargarExp();
  //   },
  //     err => {
  //       this.toastr.error(err.error.mensaje, 'Fail', {
  //         timeOut: 3000, positionClass: "toast-top-center"
  //       });
  //     });

  // }


}
