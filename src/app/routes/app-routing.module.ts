import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimalDetailsComponent } from '../paginas/animals/animal-details/animal-details.component';
import { AnimalFormComponent } from '../paginas/animals/animal-form/animal-form.component';
import { AnimalsComponent } from '../paginas/animals/animals.component';
import { GeneralComponent } from '../paginas/general/general.component';
import { ZooDetailsComponent } from '../paginas/zoos/zoo-details/zoo-details.component';
import { ZooFormComponent } from '../paginas/zoos/zoo-form/zoo-form.component';
import { ZoosComponent } from '../paginas/zoos/zoos.component';
import { LoginComponent } from '../users/login/login.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path:'home',
    component: GeneralComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'animals',
    component: AnimalsComponent
  },
  {
    path:'animals/ver/:id',
    component: AnimalDetailsComponent
  },
  {
    path:'animals/crear',
    component: AnimalFormComponent
  },
  {
    path:'animals/editar/:id',
    component: AnimalFormComponent
  },
  {
    path:'zoos',
    component: ZoosComponent
  },
  {
    path:'zoos/ver/:id',
    component: ZooDetailsComponent
  },
  {
    path:'zoos/crear',
    component: ZooFormComponent
  },
  {
    path:'zoos/editar/:id',
    component: ZooFormComponent
  },
  {
    path:'**',
    redirectTo:''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
