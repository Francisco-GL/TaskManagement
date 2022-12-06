import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { ComponentsRoutingModule } from './components-routing.module';

// components
import { PrincipalComponent } from './principal/principal.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { TareasComponent } from './tareas/tareas.component';
import { FrasesGuardadasComponent } from './frases-guardadas/frases-guardadas.component';
import { TareasPendientesComponent } from './tareas-pendientes/tareas-pendientes.component';
import { TareasCompletadasComponent } from './tareas-completadas/tareas-completadas.component';


@NgModule({
  declarations: [
    PrincipalComponent,
    NavbarComponent,
    ConfiguracionComponent,
    TareasComponent,
    FrasesGuardadasComponent,
    TareasPendientesComponent,
    TareasCompletadasComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class ComponentsModule { }
