import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Experiencia } from '../models/experiencia';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {

  url = "https://be-argpro.onrender.com/exp/";

  constructor(private httpClient: HttpClient) { }

 public nuevo(experiencia: Experiencia):Observable<any> {
  return this.httpClient.post<any>(this.url + 'nuevo', experiencia);
 }

 public update(id: number, experiencia: Experiencia):Observable<any> {
  return this.httpClient.put<any>(this.url + `update/${id}`, experiencia);
 }

 public delete(id: number):Observable<any> {
  return this.httpClient.delete<any>(this.url + `delete/${id}`);
 }
  
  obtenerDatos():Observable<any> {
    
    return this.httpClient.get(this.url+"list").pipe(map(data => {
      sessionStorage.setItem('currentUser', JSON.stringify(data));
      return data;

  }))

  }}
