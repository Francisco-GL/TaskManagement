import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { TareasComponent } from './tareas/tareas.component';
import { TareasPendientesComponent } from './tareas-pendientes/tareas-pendientes.component';
import { FrasesGuardadasComponent } from './frases-guardadas/frases-guardadas.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { TareasCompletadasComponent } from './tareas-completadas/tareas-completadas.component';

const routes: Routes = [{
  path: '', component: NavbarComponent,
  children: [
    {path: '', redirectTo: 'tareas-pendientes', pathMatch: 'full'},
    {path: 'tareas', component: TareasComponent},
    {path: 'tareas-pendientes', component: TareasPendientesComponent},
    {path: 'tareas-completadas', component: TareasCompletadasComponent},
    {path: 'frases-guardadas', component: FrasesGuardadasComponent},
    {path: 'configuracion', component: ConfiguracionComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
