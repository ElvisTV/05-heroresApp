import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { tap, Observable, of , map } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root' // el root significa que este servicio puede ser usado de manera global y en cualquier modulo de la aplicación
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  get auth_(): Auth {
    return { ...this._auth! }
  }

  constructor( private http: HttpClient) 
  { }

  verificaAutenticacion(): Observable<boolean> {
    if ( !localStorage.getItem('token') ){
      return of(false);
    }

    return this.http.get<Auth>(`${ this.baseUrl }/usuarios/1`)
              .pipe(
                map( auth => {
                  this._auth = auth;
                  return true;
                })
              );
  }


  login () {
    return this.http.get<Auth>(`${ this.baseUrl }/usuarios/1`)
            .pipe(
              tap( auth => this._auth = auth  ),
              tap( auth => localStorage.setItem('token', auth.id) )
            );
  }

  logout(): void {
    this._auth = undefined;
  }
}
