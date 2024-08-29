import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CrudService } from 'src/app/modules/admin/services/crud.service';

@Component({
  selector: 'app-card-drama',
  templateUrl: './card-drama.component.html',
  styleUrls: ['./card-drama.component.css']
})
export class CardDramaComponent {
  // Colección de todos los productos
  coleccionProductos: Producto[] = [];

  coleccionDrama: Producto[] = [];

  productoSeleccionado!: Producto;

  modalVisible: boolean = false;

  constructor(public servicioCrud: CrudService){}

  ngOnInit(): void{
    this.servicioCrud.obtenerProducto().subscribe(producto => {
      this.coleccionProductos = producto;

      // mostrar la colección actual de drama
      this.mostrarProductoDrama();
    })
  }

  mostrarProductoDrama(){
    this.coleccionProductos.forEach(producto => {

      if(producto.categoria === "drama"){
        this.coleccionDrama.push(producto);
      }
    })
  }

  mostrarVer(info: Producto){
    this.modalVisible = true;

    this.productoSeleccionado = info;
  }
}