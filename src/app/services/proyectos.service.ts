import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Proyectos } from '../models/proyectos';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {
  
  url = "https://portfolioml.azurewebsites.net/pro/";

  constructor(private httpClient:HttpClient) { }

  public nuevo(proyectos: Proyectos):Observable<any> {
    return this.httpClient.post<any>(this.url + 'nuevo', proyectos);
   }
  
   public update(id: number, proyectos: Proyectos):Observable<any> {
    return this.httpClient.put<any>(this.url + `update/${id}`, proyectos);
   }
  
   public delete(id: number):Observable<any> {
    return this.httpClient.delete<any>(this.url + `delete/${id}`);
   }
    
    obtenerDatos():Observable<any> {
      
      return this.httpClient.get<any>(this.url+"list").pipe(map(data => {
        sessionStorage.setItem('currentUser', JSON.stringify(data));
        return data;
  
    }))
  
    }}