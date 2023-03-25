import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comentario } from 'src/app/models/comentario';
import { ComentarioService } from 'src/app/services/comentario.service';

@Component({
  selector: 'app-ver-comentario',
  templateUrl: './ver-comentario.component.html',
  styleUrls: ['./ver-comentario.component.css']
})
export class VerComentarioComponent {

  idComentario = 0;
  comentario? : Comentario;
  constructor(private route: ActivatedRoute, private comentarioservice : ComentarioService, private router: Router){
    if(this.route.snapshot.paramMap.get('id') != null){
      this.idComentario = Number(this.route.snapshot.paramMap.get('id'));
    }
  }

  ngOnInit(): void {
    this.Ver();
  }

  Ver(){
    this.comentarioservice.cargarComentario(this.idComentario).subscribe(data => {
      this.comentario = new Comentario();
      this.comentario.creador = data.creador;
      this.comentario.fechaCreacion = data.fechaCreacion;
      this.comentario.titulo = data.titulo;
      this.comentario.titutexto = data.titutexto;
    })
  }
}
