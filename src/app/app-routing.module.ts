import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login', loadChildren: () =>
      import('./Login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'Components', loadChildren: () =>
      import('./Components/components.module').then(m => m.ComponentsModule)
  },
  {
    path: '**', redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
