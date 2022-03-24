import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Animal } from 'src/app/entities/animalEntity';
import { AuthService } from 'src/app/users/auth.service';
import swal from 'sweetalert2';
import { AnimalsService } from './animals.service';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styles: [
  ]
})
export class AnimalsComponent implements OnInit {

  animales!:Animal[];
  imagenSrc!:string;

  constructor(public servicio:AnimalsService, private router:Router, public authService:AuthService) { }

  ngOnInit(): void {

    this.imagenSrc = 'assets/avatar.jpg';

    this.servicio.getAnimals().subscribe(
      resp => this.animales = resp
    );

  }

  delete( animal:Animal):void{
    swal({
      title:'Está seguro?',
      text:`Seguro que desea eliminar al animal ${animal.name}`,
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
        this.servicio.delete(animal.id).subscribe(
          resp =>{
            this.animales = this.animales.filter(anim => anim !== animal)
            swal('Animal eliminado', `Animal ${animal.name} eliminado con éxito`,'success');
          }
        )
      }
    });

  }

  verAnimal(animal:Animal) {
    this.router.navigateByUrl(`animals/ver/${animal.id}`);
  }

  editarAnimal(animal:Animal) {
    this.router.navigateByUrl(`animals/editar/${animal.id}`);
  }

}
