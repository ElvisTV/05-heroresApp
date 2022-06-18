import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [`
    mat-card {
      margin-top: 20px;
    }
  `]
})
export class ListadoComponent implements OnInit {

  public heroes: Heroe[] = [];
  public nombre: string = '';

  constructor( private heroesService: HeroesService ) { }

  ngOnInit(): void {

    this.heroesService.getHeroes()
      .subscribe( resp => {
        this.heroes = resp;
      });
  }
}
