import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {
  
  url = "https://be-argpro.onrender.com/edu/";

  constructor(private http:HttpClient) { }

  // obtenerDatos():Observable<any> {
  //   return this.http.get('./assets/data/edu.json');
  // }
obtenerDatos():Observable<any> {

  
    
    return this.http.get<any>(this.url+"list")

  }

}