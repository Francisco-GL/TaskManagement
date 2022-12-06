import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServerService } from '../../Services/server.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {

  importancia: string[] = ['Muy Importante', 'Importante', 'Poco Importante'];

  formularioTarea = new FormGroup({
    Nombre: new FormControl('', [Validators.required]),
    Descripcion: new FormControl('', [Validators.required]),
    Fecha: new FormControl('', [Validators.required]),
    Importancia: new FormControl('', [Validators.required]),
    Fecha_Realizada: new FormControl(''), // la misma fecha que fecha
    User: new FormControl('')
  });

  user: string | null = '';

  constructor(private serverService: ServerService, private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('ACCESS_TOKEN') !== null) {
      this.user = sessionStorage.getItem('USER');
    } else {
      this.serverService.logOut();
      this.router.navigate(['login']);
    }
  }

  registrar() {
    this.formularioTarea.value.User = this.user;
    this.serverService.createTask(this.formularioTarea.value).subscribe(
      (res:any) => {
        if(res.ok){
          Swal.fire({
            icon: 'success',
            title: res.msg,
            showConfirmButton: false,
            timer: 1500
          });
          this.formularioTarea.reset();
        }
      },
      err => {
        console.log('error tareas: ', err);
      }
    )
  }

  cancelar() {
    this.formularioTarea.reset();
  }

}
