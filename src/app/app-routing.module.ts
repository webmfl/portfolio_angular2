import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CuatroComponent } from './components/cuatro/cuatro.component';
import { EducacionComponent } from './components/educacion/educacion.component';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { ModalComponent } from './components/modal/modal.component';
import { SobremiComponent } from './components/sobremi/sobremi.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'home',component: HomeComponent},
  {path:'**', component: CuatroComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
