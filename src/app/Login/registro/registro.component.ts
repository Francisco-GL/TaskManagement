import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../../Services/server.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  formularioRegistro = new FormGroup({
    Correo: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    Contrasena: new FormControl('', [Validators.required, Validators.minLength(6)]),
    Alias: new FormControl('', [Validators.required])
  });

  fUbicacion = new FormGroup({
    cityName: new FormControl('', [Validators.required]),
    countryCode: new FormControl('', [Validators.required]),
    User: new FormControl('')
  });

  constructor(private router: Router, private serverService: ServerService) { }

  ngOnInit(): void {
  }

  validar() {
    // console.log('valores de formulario: ', this.formularioRegistro.value);
    // this.router.navigate(['/Components/principal']);
    this.fUbicacion.value.User = this.formularioRegistro.value.Alias;
    console.log('formularioRegistro: ', this.formularioRegistro.value, ' fUbicacion: ', this.fUbicacion.value);
    this.serverService.createUser(this.formularioRegistro.value).subscribe(
      (res: any) => {
        console.log('response: ', res);
        if (!res.ok) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Oops...',
            text: res.msg,
            showConfirmButton: true
          });
        } else {
          this.saveUbication();
          Swal.fire({
            position: 'center',
            title: 'Registrado',
            icon: 'success',
            text: res.msg,
            showConfirmButton: true,
            confirmButtonText: 'Iniciar!'
          }).then((result) => {
            if (result.isConfirmed) {
              this.createDB();
              this.router.navigate(['/Components/tareas-pendientes']);
            }
          });
        }
      },
      err => {
        console.log('error al registrar: ', err);
      }
    )
  }

  createDB() {
    this.serverService.createDataBase().subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }

  saveUbication() {
    this.serverService.createUbication(this.fUbicacion.value).subscribe(
      res => console.log('ubicacion: ', res),
      err => console.log('ubicacion error: ', err)
    )
  }

  color(option: string) {
    switch (option) {
      case 'Correo':
        if (this.formularioRegistro.get('Correo')?.errors?.['required'] && this.formularioRegistro.get('Correo')?.touched) {
          return 'red';
        } else {
          return ''
        }
      case 'Password':
        if (this.formularioRegistro.get('Contrasena')?.errors?.['required'] && this.formularioRegistro.get('Contrasena')?.touched) {
          return 'red';
        } else {
          return ''
        }
    }
    return '';
  }

}
