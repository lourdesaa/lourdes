import { Component } from '@angular/core';
// Importe la interfaz Pelicula desde la ruta especificada
import { Pelicula } from 'src/app/models/pelicula';

@Component({
  selector: 'app-card', // Define el selector del componente, que se usará para insertar este componente en una plantilla HTML
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'] 
})
export class CardComponent {
  public info: Pelicula[]; // Declaración de una propiedad pública 'info' de tipo array de objetos 'Pelicula'

  constructor() {
    // Inicialización de la propiedad 'info' con un array de objetos 'Pelicula'
    this.info = [
      {
        id: "",
        nombre: "Valiente",
        imagen: "https://c8.alamy.com/compes/hcak4x/valiente-poster-art-la-princesa-merida-voz-kelly-macdonald-2012-cortesia-de-walt-disney-pictures-everett-collection-hcak4x.jpg", 
        alt: "valiente",
        genero: "animacion,fantasia",
        director: "Mark Andrews"
      },
      {
        id: "",
        nombre: "Cars 3", 
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpKFmVVCyroFFhN-IAie4SxJ1vizYWGfLvDQnIAyTw7Q&s", 
        alt: "cars3", 
        genero: "animacion,carreras", 
        director: "Brian Fee" 
      },
      {
        id: "", 
        nombre: "Enredados", 
        imagen: "https://i.ebayimg.com/images/g/qS4AAOSwDk5Tre86/s-l1200.jpg",
        alt: "enredados",
        genero: "animacion,cuento de hadas",
        director: "Nathan Greno"
      }
    ];
  }
}

