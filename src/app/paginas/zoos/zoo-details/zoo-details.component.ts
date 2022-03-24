import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Zoo } from 'src/app/entities/zooEntity';
import swal from 'sweetalert2';
import { ZoosService } from '../zoos.service';

@Component({
  selector: 'app-zoo-details',
  templateUrl: './zoo-details.component.html',
  styles: [
  ]
})
export class ZooDetailsComponent implements OnInit {

  zoo:Zoo = new Zoo();
  fotoSeleccionada!:File;
  progreso!:number;

  constructor(private zooService:ZoosService, private activedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe(
      params => {
        let id:number = +params.get('id')!;

        this.zoo.id = id;

        if(id){
          this.zooService.getZoo(id)
          .subscribe( resp => this.zoo = resp);
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
      this.zooService.subirImagen(this.fotoSeleccionada,this.zoo.id)
      .subscribe(event =>{

        if(event.type === HttpEventType.UploadProgress){
          this.progreso = Math.round((event.loaded/event.total!)*100);
        }else if(event.type === HttpEventType.Response){
          let response:any = event.body;
          this.zoo = response.zoo as Zoo;

          swal('La imagen se ha subido correctamente!',response.mensaje,'success');
        }
      });
    }
  }
}
