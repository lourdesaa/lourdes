import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CrudService } from 'src/app/modules/admin/services/crud.service';

@Component({
  selector: 'app-card-comedia',
  templateUrl: './card-comedia.component.html',
  styleUrls: ['./card-comedia.component.css']
})
export class CardComediaComponent {
  // Colección de todos los productos
  coleccionProductos: Producto[] = [];

  coleccionComedia: Producto[] = [];

  productoSeleccionado!: Producto;

  modalVisible: boolean = false;

  constructor(public servicioCrud: CrudService){}

  ngOnInit(): void{
    this.servicioCrud.obtenerProducto().subscribe(producto => {
      this.coleccionProductos = producto;

      // mostrar la colección actual de comedia
      this.mostrarProductoComedia();
    })
  }

  mostrarProductoComedia(){
    this.coleccionProductos.forEach(producto => {

      if(producto.categoria === "comedia"){
        this.coleccionComedia.push(producto);
      }
    })
  }

  mostrarVer(info: Producto){
    this.modalVisible = true;

    this.productoSeleccionado = info;
  }
}