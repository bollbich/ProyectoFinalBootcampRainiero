import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Zoo } from 'src/app/entities/zooEntity';
import { AuthService } from 'src/app/users/auth.service';
import swal from 'sweetalert2';
import { ZoosService } from './zoos.service';

@Component({
  selector: 'app-zoos',
  templateUrl: './zoos.component.html',
  styles: [
  ]
})
export class ZoosComponent implements OnInit {

  zoos!:Zoo[];
  imagenSrc!:string;

  constructor(public servicio:ZoosService, private router:Router, public authService:AuthService) { }

  ngOnInit(): void {

    this.imagenSrc = 'assets/avatar.jpg';

    this.servicio.getZoos().subscribe(
      resp => this.zoos = resp
    );

  }

  delete( zoo:Zoo):void{
    swal({
      title:'Está seguro?',
      text:`Seguro que desea eliminar al zoo ${zoo.name}`,
      type:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Si, eliminar!',
      cancelButtonText:'No, cancelar!',
      confirmButtonClass:'p-button-rounded p-button-danger',
      cancelButtonClass:'p-button-rounded p-button-success',
      buttonsStyling:true,
      reverseButtons:true
    }).then((result)=>{
      if(result.value){
        this.servicio.delete(zoo.id).subscribe(
          resp =>{
            this.zoos = this.zoos.filter(elem => elem !== zoo)
            swal('Zoo eliminado', `Zoo ${zoo.name} eliminado con éxito`,'success');
          }
        )
      }
    });

  }

  verZoo(zoo:Zoo) {
    this.router.navigateByUrl(`zoos/ver/${zoo.id}`);
  }

  editarZoo(zoo:Zoo) {
    this.router.navigateByUrl(`zoos/editar/${zoo.id}`);
  }
}
