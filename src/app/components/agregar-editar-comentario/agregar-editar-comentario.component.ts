import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { ComentarioService } from 'src/app/services/comentario.service';
import {Comentario} from '../../models/comentario';
@Component({
  selector: 'app-agregar-editar-comentario',
  templateUrl: './agregar-editar-comentario.component.html',
  styleUrls: ['./agregar-editar-comentario.component.css']
})
export class AgregarEditarComentarioComponent implements OnInit {
  comentarios: FormGroup;
  idComentario = 0;
  accion = 'Agregar';
  constructor(private fb:FormBuilder, private route: ActivatedRoute, private comentarioservice : ComentarioService, private router: Router){
    this.comentarios = this.fb.group({
      titulo:['', Validators.required],
      creador:['', Validators.required],
      texto:['', Validators.required]
    });
    if(this.route.snapshot.paramMap.get('id') != null){
      this.idComentario = Number(this.route.snapshot.paramMap.get('id'));

    }
  }
  ngOnInit(): void {
    this.esEditar();
  }
  guardarComentario(){
    if(this.accion == 'Agregar'){
      const comentario : Comentario = {
        fechaCreacion: new Date(),
        creador: this.comentarios.get('creador')?.value,
        titulo:this.comentarios.get('titulo')?.value,
        titutexto: this.comentarios.get('texto')?.value
      };
      this.comentarioservice.guardarComentario(comentario).subscribe(data => {
        this.router.navigate(['/']);
      });
    }else{
      this.comentarioservice.cargarComentario(this.idComentario).subscribe(data => {
        data.titulo = this.comentarios.get('titulo')?.value;
        data.creador = this.comentarios.get('creador')?.value;
        data.titutexto = this.comentarios.get('texto')?.value;
        this.comentarioservice.actualizarComentario(data).subscribe(r => {
          this.router.navigate(['/']);
        })
      });
    }
  }
  esEditar(){
    if(this.idComentario > 0)
    {
      this.accion='Editar';
      this.comentarioservice.cargarComentario(this.idComentario).subscribe(data => {
        this.comentarios.patchValue({
          titulo: data.titulo,
          creador: data.creador,
          texto: data.titutexto
        })
      });
    }
  }
}
