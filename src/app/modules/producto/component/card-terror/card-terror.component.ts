import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CrudService } from 'src/app/modules/admin/services/crud.service';

@Component({
  selector: 'app-card-terror',
  templateUrl: './card-terror.component.html',
  styleUrls: ['./card-terror.component.css']
})
export class CardTerrorComponent {
coleccionProductos:Producto[]=[]
coleccionTerror:Producto[]=[]
// productoSeleccionado:Producto;
modalVisible:boolean=false

constructor(public servicioCrud:CrudService){}

ngOnInIt():void{
  this.servicioCrud.obtenerProducto().subscribe(producto=>{
    this.coleccionProductos=producto;
  })
}


mostrarProductoTerror(){
  this.coleccionProductos.forEach(producto => {
    if(producto.categoria==="terror"){
      this.coleccionTerror.push(producto)
    }
    
  });
}


mostrarVer(info:Producto){
  this.modalVisible=true
  // this.productoSeleccionado=info
}




}
