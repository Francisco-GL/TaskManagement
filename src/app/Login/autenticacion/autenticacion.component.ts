import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ServerService } from '../../Services/server.service';

@Component({
  selector: 'app-autenticacion',
  templateUrl: './autenticacion.component.html',
  styleUrls: ['./autenticacion.component.css']
})
export class AutenticacionComponent implements OnInit {

  formularioLogin = new FormGroup({
    Correo: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    Contrasena: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private router: Router, private serverService: ServerService) { }

  ngOnInit(): void {
    this.createDB();
  }

  createDB(){
    this.serverService.createDataBase().subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }

  validar() {
    // console.log('valores de formulario: ', this.formularioLogin.value);
    this.serverService.authUser(this.formularioLogin.value).subscribe(
      (res:any) => {
        console.log('auth user: ', res);
        this.router.navigate(['/Components/tareas-pendientes']);
      },
      err => {
        console.log('auth error: ', err);
        Swal.fire({
          icon: 'warning',
          title: 'Sin Coincidencias',
          text: 'Contraseña o Correo incorrecto!'
        });
        this.serverService.logOut();
        // this.formularioLogin.reset();
      }
    )
  }

  color(option: string) {
    switch (option) {
      case 'Correo':
        if (this.formularioLogin.get('Correo')?.errors?.['required'] && this.formularioLogin.get('Correo')?.touched) {
          return '3px solid red';
        } else {
          return ''
        }
      case 'Password':
        if (this.formularioLogin.get('Contrasena')?.errors?.['required'] && this.formularioLogin.get('Contrasena')?.touched) {
          return '3px solid red';
        } else {
          return ''
        }
    }
    return '';
  }

}
