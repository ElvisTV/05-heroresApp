import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
  ]
})
export class HeroeComponent implements OnInit {

  heroe!: Heroe;

  constructor( 
    private activatedRoute: ActivatedRoute,
    private heroeService: HeroesService,
     ) { }

  ngOnInit(): void {

    // this.ActivatedRoute.params
    //   .subscribe( ({id}) => console.log(id) )

    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.heroeService.getHeroeId(id) )
      )
      .subscribe( heroe => {
        this.heroe = heroe
      });

  }

}
