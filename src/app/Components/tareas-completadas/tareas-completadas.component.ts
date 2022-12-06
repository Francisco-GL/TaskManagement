import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompletedTaskI } from 'src/app/Models/Tasks';
import { ServerService } from 'src/app/Services/server.service';

@Component({
  selector: 'app-tareas-completadas',
  templateUrl: './tareas-completadas.component.html',
  styleUrls: ['./tareas-completadas.component.css']
})
export class TareasCompletadasComponent implements OnInit {

  user: string | null = '';
  completedTasks: CompletedTaskI = {
    Tareas: [],
    msg: '',
    ok: false
  };
  pages: number = 1;

  constructor(private serverService: ServerService, private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('ACCESS_TOKEN') !== null) {
      this.getTareasCompletadas();
    } else {
      this.serverService.logOut();
      this.router.navigate(['login']);
    }
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

}
