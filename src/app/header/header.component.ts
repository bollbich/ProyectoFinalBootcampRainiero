import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import swal from 'sweetalert2';
import { AuthService } from '../users/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit, OnChanges {

  constructor( public authService:AuthService, private router:Router) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.setItems();
  }

  titulo:string = "Clientes App";

  items!: MenuItem[];

  subItems!: MenuItem[];

    ngOnInit()
    {
      this.setItems();

        this.items = [
                 {
                   label:'Inicio',
                   icon:'pi pi-align-left',
                   routerLink:'/'
                 },
                 {
                  label:'Zoologicos',
                  icon:'pi pi-map-marker',
                  routerLink:'zoos'
                },
                 {
                  label:'Animales',
                  icon:'pi pi-twitter',
                  routerLink:'animals'
                },
                {
                  label:this.authService.usuario.username,
                  icon:'pi pi-user',
                  items:this.subItems
                }
        ];
    }

  logout():void{
    let username = this.authService.usuario.username;
    this.authService.logout();
    swal('Logout',`${username}, has cerrado sesión con éxito`,'success');

    this.router.navigate(['/login']);

  }

  setItems() {
    if(this.authService.token){
      this.subItems = [
        {
          label:'Cerrar sesión',
          icon:'pi pi-tags',
          command: () =>this.logout()
        }
      ]
    }
    else{
      this.subItems = [
        {
          label:'Iniciar sesión',
          icon:'pi pi-tags',
          routerLink:'/login'
        }
      ]
    }
  }
}


