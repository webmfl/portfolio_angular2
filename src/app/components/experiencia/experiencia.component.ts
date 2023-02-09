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

  [x: string]: any;
  experiencia: any;
  isLogged = false;
  constructor(private datosExperiencia: ExperienciaService, 
              private tokenService: TokenService,
              private autenticacionService: AutenticacionService,
              private toastr: ToastrService
              ) { }

  ngOnInit() {

    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;

    }
    
    this.cargarExperiencias();
    console.log('Aut', this.isLogged);
  }

  public cargarExperiencias(): void {
    this.datosExperiencia.obtenerDatos().subscribe(data => {
      console.log(data);
      this.experiencia = data;
    });
  }

  borrar(id: number) {
    
    
      
    this.datosExperiencia.delete(id).subscribe(data=>{
      
      this.toastr.success('Eliminado', 'OK', {timeOut: 3000, positionClass: 'toast-top-center'});
      this.cargarExperiencias();
    });
  }

  
}