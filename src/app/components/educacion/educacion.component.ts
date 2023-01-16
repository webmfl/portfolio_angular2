import { Component, OnInit } from '@angular/core';
import { EducacionService } from 'src/app/services/educacion.service';
import { TokenService } from 'src/app/services/token.service'

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  [x: string]: any;
  educacion: any;
  isLogged = false;
  token="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY3MzgyNzMzMiwiZXhwIjoxNjczODYzMzMyfQ.cWanI_IE5kTDGvjeyUgbZb052rNX7kt7lltC3_cUu4iFov_ezF4jK-CeLzgN_ZZ2VENgfdd3XIebwZPTYigrFg";
  constructor(private datosEducacion: EducacionService, private tokenService: TokenService ) { }

  ngOnInit() {

    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;

    }
    
    this.datosEducacion.obtenerDatos().subscribe(data =>{
      console.log(data);
      this.educacion=data;
    });
  }

}
