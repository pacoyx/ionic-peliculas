import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cast, Pelicula, PeliculaDetalle } from 'src/app/interfaces/interfaces';
import { DatalocalService } from 'src/app/services/datalocal.service';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
  @Input() id;
  pelicula: PeliculaDetalle = {};
  oculto = 150;
  actores: Cast[] = [];
  existe: boolean;
  estrella = 'star-outline'

  slidesOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: true
  }

  constructor(
    private moviesServices: MoviesService,
    private modealCtrl: ModalController,
    private datalocalServis: DatalocalService) { }

  ngOnInit() {

    this.datalocalServis.existePelicula(this.id).then(existe => {
      this.estrella = (existe) ? 'star' : 'star-outline';
    });


    this.moviesServices.getPeliculaDetalle(this.id).subscribe(resp => {
      this.pelicula = resp;
    });

    this.moviesServices.getActoresPelicula(this.id).subscribe(resp => {
      console.log(resp);
    });

    this.moviesServices.getActoresPelicula(this.id).subscribe(resp => {
      this.actores = resp.cast;
    });

  }

  regresar() {
    this.modealCtrl.dismiss();
  }

  favoritos() {
    const existe = this.datalocalServis.guardarPelicula(this.pelicula);
    console.log(existe);
    
    this.estrella = (existe) ? 'star' : 'star-outline';
  }

}
