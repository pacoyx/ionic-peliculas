import { Component } from '@angular/core';
import { Genre, PeliculaDetalle } from '../interfaces/interfaces';
import { DatalocalService } from '../services/datalocal.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  peliculas: PeliculaDetalle[] = [];
  generos: Genre[] = [];
  favoritoGenero: any[] = [];

  constructor(
    private datalocal: DatalocalService,
    private movieServis: MoviesService) { }

  async ionViewWillEnter() {
    this.peliculas = await this.datalocal.cargarFavoritos();
    this.generos = await this.movieServis.cargarGeneros();
    this.pelisPorGenero(this.generos, this.peliculas);
  }



  pelisPorGenero(generos: Genre[], peliculas: PeliculaDetalle[]) {


    this.favoritoGenero = [];

    generos.forEach(genero => {

      this.favoritoGenero.push({
        genero: genero.name,
        pelis: peliculas.filter(peli => {
          return peli.genres.find(genren => genren.id === genero.id)
        })
      });
    });


  }



}
