import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {
  
  url = "http://localhost:8080/edu/";

  constructor(private http:HttpClient) { }

  // obtenerDatos():Observable<any> {
  //   return this.http.get('./assets/data/edu.json');
  // }
obtenerDatos():Observable<any> {
    
    return this.http.get<any>(this.url+"list")

  }

}