import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarComponent } from './Componentes/registrar/registrar.component';
import { BienvenidaComponent } from './Paginas/bienvenida/bienvenida.component';

const routes: Routes = [
  { path:"welcome", component:BienvenidaComponent },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'registro/:tipo', component:RegistrarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
