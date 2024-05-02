import { Component } from '@angular/core';
//importamos interfaz
import { Pelicula } from 'src/app/models/pelicula';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  public info: Pelicula[];

  constructor(){
    this.info=[
      {
        id:"",
        nombre:"Valiente",
        imagen:"https://c8.alamy.com/compes/hcak4x/valiente-poster-art-la-princesa-merida-voz-kelly-macdonald-2012-cortesia-de-walt-disney-pictures-everett-collection-hcak4x.jpg",
        alt:"valiente",
        genero:"animacion,fantasia",
        estreno:2012,
        director:"Mark Andrews",
      },
      {
        id:"",
        nombre:"Cars 3",
        imagen:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpKFmVVCyroFFhN-IAie4SxJ1vizYWGfLvDQnIAyTw7Q&s",
        alt:"cars3",
        genero:"animacion,carreras",
        estreno:2017,
        director:"Brian fee"
      },
      {
        id:"",
        nombre:"Enredados",
        imagen:"https://i.ebayimg.com/images/g/qS4AAOSwDk5Tre86/s-l1200.jpg",
        alt:"enredados",
        genero:"animacion,cuento de hadas",
        estreno:2010,
        director:"Nathan Greno"
      }
    ]
  }

}
