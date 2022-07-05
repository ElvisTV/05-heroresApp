import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
    .elvis {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-image: url('https://images4.alphacoders.com/936/936378.jpg');
      background-size: 100% 100%;
    }
  `]
})
export class LoginComponent {

  constructor(  private router: Router,
                private AuthService: AuthService ) 
  { }

  login():void {
    //Ir al BackEnd
    //confirmar que el usuario exista
    //verificación de usuario pasword
    //obtener un usuario, mapear sus datos y almacenarlo en algún lugar
    //esa obtención de usuario se hará mediante un servicio para poder usarlo en cualquier modulo de la aplicación

    this.AuthService.login()
      .subscribe( resp => {
        // console.log(resp);

        if ( resp.id )
        {
          this.router.navigate(['./heroes']);
        }

      })

    // this.router.navigate(['./heroes']);
  }

}
