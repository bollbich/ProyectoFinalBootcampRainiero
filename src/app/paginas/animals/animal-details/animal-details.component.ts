import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Animal } from 'src/app/entities/animalEntity';
import swal from 'sweetalert2';
import { AnimalsService } from '../animals.service';

@Component({
  selector: 'app-animal-details',
  templateUrl: './animal-details.component.html',
  styles: [
  ]
})
export class AnimalDetailsComponent implements OnInit {

  animal:Animal = new Animal();
  fotoSeleccionada!:File;
  progreso!:number;


  constructor( private animalService:AnimalsService, private activedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe(
      params => {
        let id:number = +params.get('id')!;

        if(id){
          this.animalService.getAnimal(id)
          .subscribe( resp => this.animal = resp);
        }
      }
    );
  }

  seleccionarImagen(event:any){
    this.fotoSeleccionada = event.target.files[0];
  }

  subirImagen():void{
    if(!this.fotoSeleccionada){
      swal('Error','Debe selecionar una imagen','error');

    }else{
      this.animalService.subirImagen(this.fotoSeleccionada,this.animal.id)
      .subscribe(event =>{

        if(event.type === HttpEventType.UploadProgress){
          this.progreso = Math.round((event.loaded/event.total!)*100);
        }else if(event.type === HttpEventType.Response){
          let response:any = event.body;
          this.animal = response.animal as Animal;

          swal('La imagen se ha subido correctamente!',response.mensaje,'success');
        }
      });
    }
  }
}
