import { Component, OnInit } from '@angular/core';
import { EducacionService } from 'src/app/services/educacion.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  educacion: any;
  constructor(private datosEducacion: EducacionService ) { }

  ngOnInit(): void {
    this.datosEducacion.obtenerDatos().subscribe(data =>{
      console.log(data);
      this.educacion=data;
    });
  }

}
