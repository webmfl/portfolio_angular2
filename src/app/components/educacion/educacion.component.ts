import { Component, OnInit } from '@angular/core';
import { EducacionService } from 'src/app/services/educacion.service';
import { TokenService } from 'src/app/services/token.service';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators, NgForm } from '@angular/forms';
import { Educacion } from 'src/app/models/educacion';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

export class Educ {
  constructor(
    private formBuilder: FormBuilder,
    public id: number,
    public detalle: string,
    public institucion: string,
    public titulo: string
  ) {}
}

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  model: Educacion = {detalle: '', institucion: '', titulo: ''};
  model2: Educacion = {detalle: '', institucion: '', titulo: ''};
  idEdit: number;
  update: any;
  modelEdit: any;
  closeResult: string;

  [x: string]: any;
  educacion: any;
  isLogged = false;
  
  constructor(private datosEducacion: EducacionService, 
              private tokenService: TokenService,
              private toastr: ToastrService,
              private modalService: NgbModal, ) { }

  ngOnInit() {

    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;

    }
    
    this.cargarEducaciones();
    
  }

  public cargarEducaciones(): void {
    this.datosEducacion.obtenerDatos().subscribe(data =>{
      console.log(data);
      this.educacion=data;
    });
  }

  borrar(id: number) {
      
    this.datosEducacion.delete(id).subscribe(data=>{
      
      this.toastr.success('Eliminado', 'OK', {timeOut: 3000, positionClass: 'toast-top-center'});
      this.cargarEducaciones();
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

  openDetails(targetModal: any, educ: Educ) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
    
   
    document.getElementById('institucionEdit')?.setAttribute('value', educ.institucion);
    document.getElementById('tituloEdit')?.setAttribute('value', educ.titulo);
    document.getElementById('detalleEdit')!.innerHTML=educ.detalle;
    this.idEdit = educ.id
    this.model2.institucion=educ.institucion;
    this.model2.detalle=educ.detalle;
    this.model2.titulo=educ.titulo;
    
 }


 onSubmit() {
   
  
  this.datosEducacion.nuevo(this.model).subscribe((response: Educacion) => {
    console.log(response)
    this.toastr.success('Grabado', 'OK', {timeOut: 3000, positionClass: 'toast-top-center'});
    this.cargarEducaciones();
  });

  
  this.modalService.dismissAll(); //dismiss the modal
}

onSubmitEdit() {

  this.update = {institucion: this.model2.institucion , titulo: this.model2.titulo, detalle: this.model2.detalle};
  
  this.datosEducacion.update(this.idEdit , this.update).subscribe((response: Educacion) => {
    
    this.toastr.success('Modificado', 'OK', {timeOut: 3000, positionClass: 'toast-top-center'});
    this.cargarEducaciones();
  });
  
  this.modalService.dismissAll(); //dismiss the modal
 }
}
