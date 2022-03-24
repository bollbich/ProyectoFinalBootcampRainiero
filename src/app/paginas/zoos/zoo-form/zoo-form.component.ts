import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Animal } from 'src/app/entities/animalEntity';
import { Zoo } from 'src/app/entities/zooEntity';
import { AuthService } from 'src/app/users/auth.service';
import swal from 'sweetalert2';
import { AnimalsService } from '../../animals/animals.service';
import { ZoosService } from '../zoos.service';

@Component({
  selector: 'app-zoo-form',
  templateUrl: './zoo-form.component.html',
  styles: [
  ]
})
export class ZooFormComponent implements OnInit {

  titulo:string ="Nuevo Zoo";

  zoo!: Zoo;

  animales!:Animal[];

  constructor(private zooService:ZoosService,
    private router:Router, private activatedRoute:ActivatedRoute,
    private authService:AuthService, private animalService:AnimalsService) { }

    ngOnInit(): void {

      this.animalService.getAnimals().subscribe(
        resp => this.animales = resp
      );

      if(this.authService.token){

        this.activatedRoute.paramMap.subscribe(
          params =>{
            let id = +params.get('id')!;

            console.log(id);
            if(id){
              this.zooService.getZoo(id).subscribe(
                resp => this.zoo = resp
              )
            }
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
      this.zooService.create(this.zoo).subscribe(
        resp => {
          swal('Nuevo Zoo',`${this.zoo.name} creado con éxito`,'success');
          this.router.navigate(['/zoos']);
        },
        err=>{
          console.log('Codigo de error backend',err.status);
        }
      );
    }

    update():void{
      console.log(this.zoo);
      this.zooService.update(this.zoo).subscribe(
        resp=>{
          this.router.navigate(['/zoos']);
          swal('Zoo Actualizado',`${this.zoo.name}`,'success');
        },
        err=>{
          console.error('Codigo del error desde el backend'+err.status);
          console.error(err.error.errros)
        }
      );
    }

}
