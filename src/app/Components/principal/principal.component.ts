import { Component, OnInit } from '@angular/core';
import { FrasesService } from '../../Services/frases.service';
import { ClimaService } from '../../Services/clima.service';
import { ClimaI, Coord, Main } from '../../Models/Clima';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  Frase: string = '';
  weather: ClimaI = {
    coord: { lon: 0, lat: 0 },
    weather: [{
      description: '',
      icon: '',
      id: 0,
      main: ''
    }],
    base: '',
    main: {
      feels_like: 0,
      pressure: 0,
      humidity: 0,
      temp: 0,
      temp_max: 0,
      temp_min: 0
    },
    visibility: 0,
    wind: {
      deg: 0,
      speed: 0
    },
    clouds: {
      all: 0
    },
    dt: 0,
    sys: {
      country: '',
      id: 0,
      sunrise: 0,
      sunset: 0,
      type: 0
    },
    timezone: 0,
    id: 0,
    name: '',
    cod: 0
  };

  constructor(private fraseService: FrasesService, private climaService: ClimaService) { }

  ngOnInit(): void {
    this.obtenerClima();
    this.obtenerFrase();
    // this.obtenerFraseCelebre();
  }

  obtenerFraseCelebre() {
    this.fraseService.getFraseCelebre().subscribe(
      res => {
        console.log(res.contents.quotes[0].quote);
      },
      err => {
        console.log('error frase celebre: ', err);
      }
    );
  }

  obtenerFrase() {
    this.fraseService.getFrase().subscribe(
      res => {
        console.log('resultado: ', res);
        this.Frase = res.value;
      },
      err => {
        console.log('Error frase: ', err);
      }
    )
  }

  obtenerClima() {
    let hora = new Date().getHours();
    console.log('hora: ', hora);
    console.log('new date(): ');
    this.climaService.getClima('Mexico', 'mx').subscribe(
      res => {
        console.log('response weather: ', res);
        this.weather = res;
      },
      err => {
        console.log('error clima: ', err);
      }
    )
  }

}
