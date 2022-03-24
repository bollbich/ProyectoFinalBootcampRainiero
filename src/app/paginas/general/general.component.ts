import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/users/auth.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styles: [
  ]
})
export class GeneralComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

}
