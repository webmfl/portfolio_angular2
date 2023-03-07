import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { interceptorProvider } from './interceptors/experiencia-interceptor.service';

import { ModalComponent } from './components/modal/modal.component';
import { EducacionComponent } from './components/educacion/educacion.component';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';
import { HeaderComponent } from './components/header/header.component';
import { SobremiComponent } from './components/sobremi/sobremi.component';
import { CuatroComponent } from './components/cuatro/cuatro.component';
import { HomeComponent } from './components/home/home.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerComponent } from "./components/spinner/spinner.component";
import { SpinnerModule } from './components/spinner/spinner.module';
import { SpinnerInterceptorService } from './interceptors/spinner-interceptor';
import { HabilidadesComponent } from './components/habilidades/habilidades.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';


@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    EducacionComponent,
    ExperienciaComponent,
    HeaderComponent,
    SobremiComponent,
    CuatroComponent,
    HomeComponent,
    SpinnerComponent,
    HabilidadesComponent,
    ProyectosComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    SpinnerModule,
    NgbModule,
    FormsModule,   
    
    
  ],
  providers: [interceptorProvider,{provide:LocationStrategy, useClass:HashLocationStrategy},
              {provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
