import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Proyectos } from 'src/app/models/proyectos';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { TokenService } from 'src/app/services/token.service';

export class Proy {
  constructor(
    private formBuilder: FormBuilder,
    public id: number,
    public nombre: string,
    public enlace: string,
    public descripcion: string
  ) {}
}

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit { 
  
  model: Proyectos = {nombre: '', enlace: '', descripcion: ''};
  model2: Proyectos = {nombre: '', enlace: '', descripcion: ''};
  idEdit: number;
  update: any;
  modelEdit: any;
  closeResult: string;

  [x: string]: any;
  proyectos: any;
  isLogged = false;
  
  constructor(private datosProyectos: ProyectosService, 
              private tokenService: TokenService,
              private toastr: ToastrService,
              private modalService: NgbModal, ) { }
  
  ngOnInit() {

      if (this.tokenService.getToken()) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
  
      }
      
      this.cargarProyectos();
      
    }

    public cargarProyectos(): void {
      this.datosProyectos.obtenerDatos().subscribe(data =>{
        console.log(data);
        this.proyectos=data;
      });
    }

    borrar(id: number) {
      
      this.datosProyectos.delete(id).subscribe(data=>{
        
        this.toastr.success('Eliminado', 'OK', {timeOut: 3000, positionClass: 'toast-top-center'});
        this.cargarProyectos();
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

    openDetails(targetModal: any, proy: Proy) {
      this.modalService.open(targetModal, {
       centered: true,
       backdrop: 'static',
       size: 'lg'
     });
  
      document.getElementById('nombreEdit')?.setAttribute('value', proy.nombre);
      document.getElementById('enlaceEdit')?.setAttribute('value', proy.enlace);
      document.getElementById('descripcionEdit')!.innerHTML=proy.descripcion;
      
      this.idEdit = proy.id
      this.model2.nombre=proy.nombre;
      this.model2.enlace=proy.enlace;
      this.model2.descripcion=proy.descripcion;
  
    }

    onSubmit() {
   
  
      this.datosProyectos.nuevo(this.model).subscribe((response: Proyectos) => {
        console.log(response)
        this.toastr.success('Grabado', 'OK', {timeOut: 3000, positionClass: 'toast-top-center'});
        this.cargarProyectos();
      });
    
      
      this.modalService.dismissAll(); //dismiss the modal
    }

    onSubmitEdit() {

      this.update = {nombre: this.model2.nombre , enlace: this.model2.enlace, descripcion: this.model2.descripcion};
      
      this.datosProyectos.update(this.idEdit , this.update).subscribe((response: Proyectos) => {
        
        this.toastr.success('Modificado', 'OK', {timeOut: 3000, positionClass: 'toast-top-center'});
        this.cargarProyectos();
      });
      
      this.modalService.dismissAll(); //dismiss the modal
     }

}
