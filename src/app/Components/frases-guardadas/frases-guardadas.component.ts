import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../Services/server.service';
import { Router } from '@angular/router';
import { UserI } from '../../Models/User';
import { QuotePeticion } from '../../Models/Frases';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-frases-guardadas',
  templateUrl: './frases-guardadas.component.html',
  styleUrls: ['./frases-guardadas.component.css']
})
export class FrasesGuardadasComponent implements OnInit {

  userData:UserI = {
    Alias: '',
    Correo: '',
    Contrasena: ''
  }

  frases: QuotePeticion[] = [];
  pages: number = 1;

  constructor(private serverService: ServerService, private router: Router) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('ACCESS_TOKEN') !== null){
      this.getUserData();
    }else{
      this.serverService.logOut();
      this.router.navigate(['login']);
    }
  }

  delete(frase: QuotePeticion){
    const obj = {
      Frase: frase.Frase,
      User: frase.User
    };
    this.serverService.deleteQuote(obj).subscribe(
      (res:any) => {
        if(res.ok){
          Swal.fire({
            icon: 'success',
            title: res.msg,
            timer: 1500,
            showConfirmButton: false
          });
          this.getSavedQuotes();
        }
      },
      err => {
        console.log('error delete quote: ', err);
      }
    )
  }
  
  getUserData() {
    let user:any = sessionStorage.getItem('USER');
    this.serverService.getUserData(user).subscribe(
      (res:UserI) => {
        this.userData = res;
        this.getSavedQuotes();
      }
    )
  }

  getSavedQuotes() {
    console.log('user: ', this.userData.Alias);
    this.serverService.getSavedQuotes(this.userData.Alias).subscribe(
      res => {
        console.log('quotes response: ', res);
        this.frases = res;
        console.log('quotes response frases: ', this.frases);
      },
      err => {
        console.log('quotes error: ', err);
      }
    )
  }

}
