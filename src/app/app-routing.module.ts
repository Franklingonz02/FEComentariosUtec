import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { AgregarEditarComentarioComponent } from './components/agregar-editar-comentario/agregar-editar-comentario.component';
import { ListComentariosComponent } from './components/list-comentarios/list-comentarios.component';
import { VerComentarioComponent } from './components/ver-comentario/ver-comentario.component';

const routes: Routes = [
  {path: 'agregar', component: AgregarEditarComentarioComponent},
  {path: 'editar/:id', component: AgregarEditarComentarioComponent},
  {path: 'ver/:id', component: VerComentarioComponent},  
  {path: 'eliminar/:id', component: ListComentariosComponent},
  {path: '', component: ListComentariosComponent, pathMatch: 'full'},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
