import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../Services/server.service';
import { Router } from '@angular/router';
import { CompletedTaskI, TaskI } from '../../Models/Tasks';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tareas-pendientes',
  templateUrl: './tareas-pendientes.component.html',
  styleUrls: ['./tareas-pendientes.component.css']
})
export class TareasPendientesComponent implements OnInit {

  user: string | null = '';
  pendingTasks: TaskI[] = [];
  completedTasks: CompletedTaskI = {
    Tareas: [],
    msg: '',
    ok: false
  };
  pages: number = 1;

  constructor(private serverService: ServerService, private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('ACCESS_TOKEN') !== null) {
      this.getTareasPendientes();
      this.getTareasCompletadas();
    } else {
      this.serverService.logOut();
      this.router.navigate(['login']);
    }
  }
  
  done(taskDescription: string) {
    this.user = sessionStorage.getItem('USER');
    let info = {
      User: this.user,
      Descripcion: taskDescription
    };

    this.serverService.chageStatus(info).subscribe(
      (res:any) => {
        console.log('response update: ', res);
        Swal.fire({
          icon: 'success',
          title: res.msg,
          showConfirmButton: false,
          timer: 1500
        });
        this.getTareasPendientes();
      },
      err => {
        console.log('update error: ', err);
      }
    )
  }

  getTareasCompletadas() {
    this.user = sessionStorage.getItem('USER');
    this.serverService.getCompletedTasks(this.user).subscribe(
      res => {
        this.completedTasks = res;
        console.log('completed tasks: ', this.completedTasks);
      },
      err => {
        console.log('completed tasks error: ', err);
      }
    );
  }

  getTareasPendientes() {
    this.user = sessionStorage.getItem('USER');
    this.serverService.getPendingTasks(this.user).subscribe(
      res => {
        this.pendingTasks = res;
        console.log('pending tasks: ', this.pendingTasks);
      },
      err => {
        console.log('error tareas pendientes: ', err);
      }
    );
  }

}
