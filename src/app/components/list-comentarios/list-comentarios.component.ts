import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comentario } from 'src/app/models/comentario';
import { ComentarioService } from 'src/app/services/comentario.service';

@Component({
  selector: 'app-list-comentarios',
  templateUrl: './list-comentarios.component.html',
  styleUrls: ['./list-comentarios.component.css']
})
export class ListComentariosComponent implements OnInit {
  idComentario = 0;
  listComentarios?: Comentario[];
  loading = false;
  constructor(private comentarioService: ComentarioService, private route: ActivatedRoute, private router: Router){
    if(this.route.snapshot.paramMap.get('id') != null){
      this.idComentario = Number(this.route.snapshot.paramMap.get('id'));
    }
  }
  ngOnInit() : void{    
    if(this.idComentario > 0){
      this.eliminarComentario();
    }
    this.cargarComentario();
  }

  cargarComentario(){
    this.comentarioService.getListComentarios().subscribe(data => {
      this.listComentarios = data;
    });
  }

  eliminarComentario(){
    this.comentarioService.borrarComentario(this.idComentario).subscribe(data =>{
      this.router.navigate(['/'])
    })
  }
  
}
