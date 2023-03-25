import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Comentario} from '../models/comentario';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  myAppUrl = 'http://localhost:5291/';
  myApiURL = 'api/Comentarios/';
  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  }
  constructor(private http: HttpClient) {

   }

   getListComentarios() : Observable<Comentario[]>{
    return this.http.get<Comentario[]>(this.myAppUrl + this.myApiURL);
   }

   borrarComentario(id: number) : Observable<Comentario>{
    return this.http.delete<Comentario>(this.myAppUrl + this.myApiURL + id);
   }
   guardarComentario(comentario: Comentario) : Observable<Comentario>{
    return this.http.post<Comentario>(this.myAppUrl + this.myApiURL, comentario,this.httpOptions);
   }
   cargarComentario(id:number) : Observable<Comentario>{
    return this.http.get<Comentario>(this.myAppUrl + this.myApiURL + id);
   }
   actualizarComentario(comentario: Comentario) : Observable<Comentario>{
    return this.http.put<Comentario>(this.myAppUrl + this.myApiURL + comentario.id, comentario,this.httpOptions);
   }
}
