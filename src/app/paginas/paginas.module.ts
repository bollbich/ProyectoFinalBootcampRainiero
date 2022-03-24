import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralComponent } from './general/general.component';
import { AnimalsComponent } from './animals/animals.component';
import { ZoosComponent } from './zoos/zoos.component';
import { ZooDetailsComponent } from './zoos/zoo-details/zoo-details.component';
import { AnimalDetailsComponent } from './animals/animal-details/animal-details.component';
import { AnimalFormComponent } from './animals/animal-form/animal-form.component';
import { ZooFormComponent } from './zoos/zoo-form/zoo-form.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    GeneralComponent,
    AnimalsComponent,
    ZoosComponent,
    ZooDetailsComponent,
    AnimalDetailsComponent,
    AnimalFormComponent,
    ZooFormComponent

  ],
  exports:[
    GeneralComponent,
    AnimalsComponent,
    ZoosComponent,
    ZooDetailsComponent,
    AnimalDetailsComponent,
    AnimalFormComponent,
    ZooFormComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    RouterModule,
    FormsModule
  ]
})
export class PaginasModule { }
