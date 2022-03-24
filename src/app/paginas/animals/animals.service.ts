import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Animal } from 'src/app/entities/animalEntity';
import { AuthService } from 'src/app/users/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AnimalsService {

  urlEndPoint:string ="http://localhost:8087/api/animals";

  constructor(private http:HttpClient,private authService:AuthService) { }

  httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  agregarAuthorizationHeader():any{
    let token = this.authService.token;
    if(token != null){
      return this.httpHeaders.append('Authorization', 'Bearer'+token);
    }
    return this.httpHeaders;
  }

  getAnimals():Observable<Animal[]>{
    return this.http.get(this.urlEndPoint).pipe(
      map( (response) => response as Animal[] )
    );
  }

  //metodo de post para insertar animales
  create(animal:Animal):Observable<Animal>{
    return this.http.post<Animal>(`${this.urlEndPoint}/save`,animal, { headers: this.agregarAuthorizationHeader() });
  }

  //buscar animal por id
  getAnimal(id:number):Observable<Animal>{
    return this.http.get<Animal>(`${this.urlEndPoint}/ver/${id}`,{ headers: this.agregarAuthorizationHeader() })
  }

  //actualizar animal
  update(animal:Animal):Observable<Animal>{
    return this.http.put<Animal>(`${this.urlEndPoint}/update/${animal.id}`, animal,{ headers: this.agregarAuthorizationHeader() })
  }

  //eliminar animal
  delete(id:number):Observable<Animal>{
    return this.http.delete<Animal>(`${this.urlEndPoint}/delete/${id}`,{ headers: this.agregarAuthorizationHeader() })
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
