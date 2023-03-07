import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Habilidades } from 'src/app/models/habilidades';
import { HabilidadesService } from 'src/app/services/habilidades.service';
import { TokenService } from 'src/app/services/token.service';

export class Habi {
  constructor(
    private formBuilder: FormBuilder,
    public id: number,
    public especialidad: string,
    public puntaje: string,
    public segmento: string
  ) {}
}

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {

  model: Habilidades = {especialidad: '', puntaje: '', segmento: ''};
  model2: Habilidades = {especialidad: '', puntaje: '', segmento: ''};
  idEdit: number;
  update: any;
  modelEdit: any;
  closeResult: string;

  [x: string]: any;
  habilidades: any;
  isLogged = false;
  
  constructor(private datosHabilidades: HabilidadesService, 
              private tokenService: TokenService,
              private toastr: ToastrService,
              private modalService: NgbModal, ) { }

  ngOnInit() {

    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;

    }
    
    this.cargarHabilidades();
    
  }

  public cargarHabilidades(): void {
    this.datosHabilidades.obtenerDatos().subscribe(data =>{
      console.log(data);
      this.habilidades=data;
    });
  }

  borrar(id: number) {
      
    this.datosHabilidades.delete(id).subscribe(data=>{
      
      this.toastr.success('Eliminado', 'OK', {timeOut: 3000, positionClass: 'toast-top-center'});
      this.cargarHabilidades();
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

  openDetails(targetModal: any, habi: Habi) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });

   document.getElementById('especialidadEdit')?.setAttribute('value', habi.especialidad);
    document.getElementById('puntajeEdit')?.setAttribute('value', habi.puntaje);
    
    this.idEdit = habi.id
    this.model2.especialidad=habi.especialidad;
    this.model2.puntaje=habi.puntaje;

  }

    
    

    onSubmit() {
   
  
      this.datosHabilidades.nuevo(this.model).subscribe((response: Habilidades) => {
        console.log(response)
        this.toastr.success('Grabado', 'OK', {timeOut: 3000, positionClass: 'toast-top-center'});
        this.cargarHabilidades();
      });
    
      
      this.modalService.dismissAll(); //dismiss the modal
    }
    

    onSubmitEdit() {

      this.update = {especialidad: this.model2.especialidad , puntaje: this.model2.puntaje};
      
      this.datosHabilidades.update(this.idEdit , this.update).subscribe((response: Habilidades) => {
        
        this.toastr.success('Modificado', 'OK', {timeOut: 3000, positionClass: 'toast-top-center'});
        this.cargarHabilidades();
      });
      
      this.modalService.dismissAll(); //dismiss the modal
     }
}
