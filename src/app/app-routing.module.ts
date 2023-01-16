import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { CuatroComponent } from './components/cuatro/cuatro.component';
import { HomeComponent } from './components/home/home.component';
import { ModalComponent } from './components/modal/modal.component';



const routes: Routes = [
  {path:'', redirectTo: 'home', pathMatch: 'full'},
  
  {path:'home',component: HomeComponent},
  {path:'modal',component: ModalComponent},
  {path:'**', component: CuatroComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  [x: string]: any;
  navigate(arg0: string[]) {
    throw new Error('Method not implemented.');
  }
}
