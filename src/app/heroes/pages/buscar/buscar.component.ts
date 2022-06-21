import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  termino: string = '';
  heroes: Heroe[] = [];
  // heroeSeleccionado!: Heroe;
  heroeSeleccionado!: Heroe | undefined ;
  flag: boolean = false;

  //las inyecciones para usar servicios siempre se usar en el constructor

  constructor( private heroesService: HeroesService ) { }

  ngOnInit(): void {

  }

  buscando()  {
    this.heroesService.getSugerencias(this.termino.trim())
      .subscribe(heroes => this.heroes = heroes )
  }
  opcionSeleccionada(event: MatAutocompleteSelectedEvent) {

    if( !event.option.value  )
    {
      this.heroeSeleccionado = undefined;
      return;
    }
      const heroe: Heroe = event.option.value;
      this.termino = heroe.superhero;
      
      //en esta parte, nuevamente se vuelve a traer el objeto    
      this.heroesService.getHeroeId(heroe.id!)
        .subscribe( heroe => this.heroeSeleccionado = heroe );
   
  }

}
