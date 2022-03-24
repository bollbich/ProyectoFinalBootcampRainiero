import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  user: User = new User();

  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {

  }

  login():void{
    console.log(this.user);

    if(this.user.username == null || this.user.password == null){
      swal('Error Login','Username o password vacias!','error');
      return;
    }

    this.authService.login(this.user).subscribe(
      resp => {
        console.log(resp);
        this.authService.guardarUsuario(resp.access_token);
        this.authService.guardarToken(resp.access_token);
        let usuario = this.authService.usuario;

        this.router.navigate(['/home']);

        swal('Login',`Hola ${usuario.username}, ha iniciado sesión con éxito`,'success');
      },
      err=>{
        if(err.status == 400){
          swal("Error login","Usuario o clave incorrectas!","error");
        }
      }
    );
  }
}
