import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Educacion } from '../models/educacion';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {
  
  url = "https://be-argpro.onrender.com/edu/";

  constructor(private httpClient:HttpClient) { }

  public nuevo(educacion: Educacion):Observable<any> {
    return this.httpClient.post<any>(this.url + 'nuevo', educacion);
   }
  
   public update(id: number, educacion: Educacion):Observable<any> {
    return this.httpClient.put<any>(this.url + `update/${id}`, educacion);
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
  
  

