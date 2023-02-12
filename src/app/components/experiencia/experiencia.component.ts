import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Experiencia } from 'src/app/models/experiencia';

import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { TokenService } from 'src/app/services/token.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';



export class Exper {
  constructor(
    private formBuilder: FormBuilder,
    public id: number,
    public detalle: string,
    public empresa: string,
    public periodo: string
  ) {}
}

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  model: Experiencia = {detalle: '', empresa: '', periodo: ''};
  model2: Experiencia = {detalle: '', empresa: '', periodo: ''};
  idEdit: number;
  update: any;
  
  modelEdit: any;
  closeResult: string;
  [x: string]: any;
  experiencia: any;
  isLogged = false;
  
  
  constructor(
              private formBuilder: FormBuilder,
              private datosExperiencia: ExperienciaService, 
              private tokenService: TokenService,
              private autenticacionService: AutenticacionService,
              private toastr: ToastrService,
              private httpClient: HttpClient,
              private modalService: NgbModal,
              private reactiveforms: ReactiveFormsModule
              
              ) {  }

  ngOnInit() {

    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;

    }

    this.cargarExperiencias();
    
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

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Cerrado con: ${result}`;
    }, (reason) => {
      this.closeResult = `Cerrado ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'presionando ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'o clickeando el backdrop';
    } else {
      return `con: ${reason}`;
    }
  }


  openDetails(targetModal: any, exper: Exper) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
    
   
    document.getElementById('empresaEdit')?.setAttribute('value', exper.empresa);
    document.getElementById('periodoEdit')?.setAttribute('value', exper.periodo);
    document.getElementById('detalleEdit')!.innerHTML=exper.detalle;
    this.idEdit = exper.id
    this.model2.empresa=exper.empresa;
    this.model2.detalle=exper.detalle;
    this.model2.periodo=exper.periodo;
    
    
    
 }

 

 onSubmit() {
   
  
  this.datosExperiencia.nuevo(this.model).subscribe((response: Experiencia) => {
    console.log(response)
    this.toastr.success('Grabado', 'OK', {timeOut: 3000, positionClass: 'toast-top-center'});
    this.cargarExperiencias();
  });

  
  this.modalService.dismissAll(); //dismiss the modal
}

 onSubmitEdit() {

  this.update = {empresa: this.model2.empresa , periodo: this.model2.periodo, detalle: this.model2.detalle};
  
  this.datosExperiencia.update(this.idEdit , this.update).subscribe((response: Experiencia) => {
    
    this.toastr.success('Modificado', 'OK', {timeOut: 3000, positionClass: 'toast-top-center'});
    this.cargarExperiencias();
  });
  
  this.modalService.dismissAll(); //dismiss the modal
 }
  
}