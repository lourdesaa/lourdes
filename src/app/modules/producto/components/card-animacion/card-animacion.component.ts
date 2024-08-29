import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CrudService } from 'src/app/modules/admin/services/crud.service';

@Component({
  selector: 'app-card-animacion',
  templateUrl: './card-animacion.component.html',
  styleUrls: ['./card-animacion.component.css']
})
export class CardAnimacionComponent {
  // Colección de todos los productos
  coleccionProductos: Producto[] = [];

  coleccionAnimacion: Producto[] = [];

  productoSeleccionado!: Producto;

  modalVisible: boolean = false;

  constructor(public servicioCrud: CrudService){}

  ngOnInit(): void{
    this.servicioCrud.obtenerProducto().subscribe(producto => {
      this.coleccionProductos = producto;

      // mostrar la colección actual de animacion
      this.mostrarProductoAnimacion();
    })
  }

  mostrarProductoAnimacion(){
    this.coleccionProductos.forEach(producto => {

      if(producto.categoria === "animacion"){
        this.coleccionAnimacion.push(producto);
      }
    })
  }

  mostrarVer(info: Producto){
    this.modalVisible = true;

    this.productoSeleccionado = info;
  }
}