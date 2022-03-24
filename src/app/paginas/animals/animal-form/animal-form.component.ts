import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Animal } from 'src/app/entities/animalEntity';
import { Zoo } from 'src/app/entities/zooEntity';
import { AuthService } from 'src/app/users/auth.service';
import swal from 'sweetalert2';
import { ZoosService } from '../../zoos/zoos.service';
import { AnimalsService } from '../animals.service';

@Component({
  selector: 'app-animal-form',
  templateUrl: './animal-form.component.html',
  styles: [
  ]
})
export class AnimalFormComponent implements OnInit {

  titulo:string ="Nuevo Animal";

  animal: Animal = new Animal();

  zoo!:Zoo;

  crear:boolean = true;

  zoologicos:Zoo[] = [];

  constructor(private animalService:AnimalsService,
    private router:Router, private activatedRoute:ActivatedRoute,
    private authService:AuthService, private zooService:ZoosService) { }

    ngOnInit(): void {

      console.log(this.crear);
      this.zooService.getZoos().subscribe(
        resp => this.zoologicos = resp
      );

      if(this.authService.token){

        this.activatedRoute.paramMap.subscribe(
          params =>{
            let id = +params.get('id')!;
            console.log(id);
            if(id>0){
              this.animalService.getAnimal(id).subscribe(
                resp => this.animal = resp
              );
              this.crear = false;
              console.log(this.crear);
            }
            else{
              this.crear = true;
              console.log(this.crear);
            }

            this.zooService.getZoo(this.animal.zoo.id).subscribe(
               resp => this.zoo = resp
            );

             this.zooService.getZoos().subscribe(
                 resp => this.zoologicos = resp
              );
            }
        );

      }else{
        swal('No esta autenticado','no autenticado','info');
        this.router.navigate(['/login']);
      }
    }

    compararZoo(o1:Zoo,o2:Zoo):boolean{
      if(o1 === undefined && o2 ===undefined){
        return true;
      }

      return o1 === null || o2===null ||
       o1===undefined ||
        o2===undefined ? false : o1.id===o2.id;

    }

    create():void{
      console.log("formulario enviado");
      console.log(this.animal);
      this.animalService.create(this.animal).subscribe(
        resp => {
          swal('Nuevo Animal',`${this.animal.name} creado con éxito`,'success');
          this.router.navigate(['/animals']);
        },
        err=>{
          console.log('Codigo de error backend',err.status);
        }
      );
    }

    update():void{
      this.animalService.update(this.animal).subscribe(
        resp=>{
          this.router.navigate(['/animals']);
          swal('Animal Actualizado',`${this.animal.name}`,'success');
          console.log(this.animal);
        },
        err=>{
          console.error('Codigo del error desde el backend'+err.status);
          console.error(err.error.errros)
        }
      );
    }
}
