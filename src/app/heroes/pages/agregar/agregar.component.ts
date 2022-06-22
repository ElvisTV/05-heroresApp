import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 10px;
    }
  `]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  }

  constructor( private heroeService: HeroesService,
               private ActivatedRoute: ActivatedRoute, 
               private router: Router ) { }

  ngOnInit(): void {
    
    if ( !this.router.url.includes('editar') ) {
      return;
    }

    this.ActivatedRoute.params
      .pipe(
        switchMap( ( {id} ) => this.heroeService.getHeroeId(id) )
      )
      .subscribe( heroe => this.heroe = heroe )

  }

  guardar() {
    if ( this.heroe.superhero.trim().length === 0 ) {
      return;
    } 

    if ( this.heroe.id ) 
    {
      this.heroeService.actualizarHeroe( this.heroe )
        .subscribe( heroe => console.log( 'Actualizando',heroe ) )
    }

    this.heroeService.agregarHeroe(this.heroe)
      .subscribe( heroe => {
        this.router.navigate(['/heroes/editar', heroe.id])
      })
    
  }

}
