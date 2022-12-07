import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FraseDiaI } from '../Models/Frases';

@Injectable({
  providedIn: 'root'
})
export class FrasesService {

  URL_FRASE: string = 'https://api.chucknorris.io/jokes/random';
  URL_FRASE2: string = 'https://en.wikiquote.org/w/api.php';
  URL_FRASEDELDIA: string = 'http://www.frasedehoy.com';
  URL_fraseCelebre: string = 'https://quotes.rest/qod?language=en';

  constructor(private http: HttpClient) { }

  getFrase(): Observable<any> {
    return this.http.get<any>(this.URL_FRASE);
  }

  getFraseCelebre():Observable<any> {
    return this.http.get<any>(this.URL_fraseCelebre);
  }
}
