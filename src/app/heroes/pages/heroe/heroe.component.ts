import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
  ]
})
export class HeroeComponent implements OnInit {

  constructor( private ActivatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {

    this.ActivatedRoute.params
      .subscribe( ({id}) => console.log(id) )

  }

}
