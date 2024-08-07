import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CrudService } from '../../services/crud.service';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  //crear cleccion de productos del tipo producto -> la definimos como un array
  coleccionProductos: Producto[] = []

  //definimos formulario para los productos
  //atributos alfanumericos (string) se inicializan con comillas simples
  //atributos numericos (number) se inicializan con cero "0"
  producto = new FormGroup({
    nombre: new FormControl('', Validators.required),
    precio: new FormControl(0, Validators.required),
    descripcion: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required),
    alt: new FormControl('', Validators.required),
  })

  constructor(public servicioCrud: CrudService) { }

  ngOnInit(): void {
    // subscribe => notifica constantemente los cambios actuales del sistema 
    this.servicioCrud.obtenerProducto().subscribe(producto => {
      // guarda la notificacion recibida como un nuevo "producto" a la coleccion
      this.coleccionProductos = producto;
    })
  }

  async agregarProducto(){
    if(this.producto.valid){
      let nuevoProducto: Producto = {
        idProducto: '',
        nombre: this.producto.value.nombre!,
        precio: this.producto.value.precio!,
        descripcion: this.producto.value.descripcion!,
        categoria: this.producto.value.categoria!,
        imagen: this.producto.value.imagen!,
        alt: this.producto.value.alt!
      }

      await this.servicioCrud.crearProducto(nuevoProducto)
      .then(producto => {
        alert("Ha agregado un nuevo producto con exito")
      })
      
      .catch(error=>{
        alert("Hubo problema al agregar un nuevo producto")
      })
    }
  }
}
