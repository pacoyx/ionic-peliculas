import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';
import { Pelicula } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar = '';
  ideas: string[] = ['Spiderman', 'Avengers', 'El señor de los anillos', 'Batman'];
  peliculas: Pelicula[] = [];
  buscando = false;

  constructor(
    private movieServis: MoviesService, 
    private modalCtrl: ModalController) { }

  buscar(e) {
    const valor: string = e.detail.value;
    if (valor.length === 0) {
      this.buscando = false;
      this.peliculas = [];
      return;
    }


    // console.log(e);
    this.buscando = true;
    this.movieServis.getBuscarPelicula(e.detail.value).subscribe(resp => {
      this.peliculas = resp['results'];
      this.buscando = false;
    });

  }



  async verDetalle(id: number) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present();

  }
}
