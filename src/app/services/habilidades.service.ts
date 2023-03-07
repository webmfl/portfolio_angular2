import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Habilidades } from '../models/habilidades';

@Injectable({
  providedIn: 'root'
})
export class HabilidadesService {
  
  url = "https://portfolioml.azurewebsites.net/hab/";

  constructor(private httpClient:HttpClient) { }

  public nuevo(habilidades: Habilidades):Observable<any> {
    return this.httpClient.post<any>(this.url + 'nuevo', habilidades);
   }
  
   public update(id: number, habilidades: Habilidades):Observable<any> {
    return this.httpClient.put<any>(this.url + `update/${id}`, habilidades);
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