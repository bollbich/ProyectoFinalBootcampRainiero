import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Zoo } from 'src/app/entities/zooEntity';
import { AuthService } from 'src/app/users/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ZoosService {

  constructor(private http:HttpClient,private authService:AuthService) { }

  urlEndPoint:string ="http://localhost:8087/api/zoos";

  getZoos():Observable<Zoo[]>{
    return this.http.get(this.urlEndPoint).pipe(
      map( (response) => response as Zoo[] )
    );
  }
  httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  agregarAuthorizationHeader():any{
    let token = this.authService.token;
    if(token != null){
      return this.httpHeaders.append('Authorization', 'Bearer'+token);
    }
    return this.httpHeaders;
  }

  //metodo de post para insertar zoo
  create(zoo:Zoo):Observable<Zoo>{
    return this.http.post<Zoo>(`${this.urlEndPoint}/save`,zoo, { headers: this.agregarAuthorizationHeader() });
  }

  //buscar zoo por id
  getZoo(id:number):Observable<Zoo>{
    return this.http.get<Zoo>(`${this.urlEndPoint}/ver/${id}`,{ headers: this.agregarAuthorizationHeader() })
  }

  //actualizar zoo
  update(zoo:Zoo):Observable<Zoo>{
    return this.http.put<Zoo>(`${this.urlEndPoint}/update/${zoo.id}`, zoo,{ headers: this.agregarAuthorizationHeader() })
  }

  //eliminar zoo
  delete(id:number):Observable<Zoo>{
    return this.http.delete<Zoo>(`${this.urlEndPoint}/delete/${id}`,{ headers: this.agregarAuthorizationHeader() })
  }

  //subir imagen
  subirImagen(archivo: File, id:any):Observable<HttpEvent<any>>{

    let formData = new FormData();
    formData.append("archivo",archivo);
    formData.append("id",id);

    let httpHeaders = new HttpHeaders();
    let token= this.authService.token;

    if(token != null){
      httpHeaders = httpHeaders.append('Authorization','Bearer '+token);
    }

    const req = new HttpRequest('POST',`${this.urlEndPoint}/upload`,formData,{headers:httpHeaders});

    return this.http.request(req).pipe(
      resp =>resp
    );
  }
}
