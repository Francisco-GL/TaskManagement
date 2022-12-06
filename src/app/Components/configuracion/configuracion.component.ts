import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../Services/server.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserI } from 'src/app/Models/User';
import { UbicationI } from '../../Models/User';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

  fUbicacion = new FormGroup({
    cityName: new FormControl({ value: '', disabled: true }, [Validators.required]),
    countryCode: new FormControl({ value: '', disabled: true }, [Validators.required]),
    User: new FormControl('')
  });

  userData: UserI = {
    Alias: '',
    Correo: '',
    Contrasena: ''
  }

  ubicacion: UbicationI = {
    cityName: '',
    countryCode: '',
    User: ''
  };

  habilitar: boolean = true;
  save: boolean = true;

  constructor(private serverService: ServerService, private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('ACCESS_TOKEN') !== null) {
      this.getUserData();
    } else {
      this.serverService.logOut();
      this.router.navigate(['login']);
    }
  }

  getUserData() {
    let user: any = sessionStorage.getItem('USER');
    this.serverService.getUserData(user).subscribe(
      res => {
        this.userData = res;
        console.log('res: ', this.userData);
        this.getUbicationData();
      },
      err => {
        console.log('err: ', err);
      }
    );
  }

  editar() {
    this.fUbicacion.enable();
    this.fUbicacion.value.cityName = this.ubicacion.cityName;
    this.fUbicacion.value.countryCode = this.ubicacion.countryCode;
    this.save = false;
  }

  saveChanges() {
    this.fUbicacion.value.User = this.userData.Alias;
    if (this.fUbicacion.value.cityName === this.ubicacion.cityName && this.fUbicacion.value.countryCode === this.ubicacion.countryCode) {
      Swal.fire({
        icon: 'question',
        title: 'Sin cambios',
        text: 'No se detectaron cambios en la información',
        showConfirmButton: true
      });
      this.fUbicacion.disable();
      this.fUbicacion.value.cityName = this.ubicacion.cityName;
      this.fUbicacion.value.countryCode = this.ubicacion.countryCode;
      this.save = true;
    }
    // if (this.fUbicacion.value.cityName === this.ubicacion.cityName || this.fUbicacion.value.countryCode === this.ubicacion.countryCode) {
    //   Swal.fire({
    //     icon: 'warning',
    //     title: 'Posible discrepancia de información',
    //     text: 'Verifica que la información este correcta',
    //     showConfirmButton: true
    //   });
    // }
    if (this.fUbicacion.value.cityName !== this.ubicacion.cityName && this.fUbicacion.value.countryCode !== this.ubicacion.countryCode) {
      this.serverService.editSettings(this.fUbicacion.value).subscribe(
        (res: any) => {
          console.log('edit settings response: ', res);
          if (res.ok) {
            Swal.fire({
              icon: 'success',
              title: 'Actualización',
              text: res.msg,
              showConfirmButton: false,
              timer: 1500
            });
            this.getUserData();
            this.fUbicacion.disable();
            this.fUbicacion.value.cityName = this.ubicacion.cityName;
            this.fUbicacion.value.countryCode = this.ubicacion.countryCode;
            this.save = true;
            window.location.reload();
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: res.msg,
              showConfirmButton: true
            });
          }
        },
        err => {
          console.log('error edit settings: ', err);
        }
      )
    }
  }

  getUbicationData() {
    this.serverService.getUbication(this.userData.Alias).subscribe(
      res => {
        this.ubicacion = res;
        this.fUbicacion.value.cityName = this.ubicacion.cityName;
        this.fUbicacion.value.countryCode = this.ubicacion.countryCode;
      },
      err => {
        console.log('error ubs: ', err);
      }
    );
  }

}
