import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CrudService } from '../../services/crud.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  // Crear colección de productos del tipo Producto
  coleccionProductos: Producto[] = [];

  // Para manejar el estado de edicion y eliminacion de productos
  modalVisibleProducto: boolean = false;

  productoSeleccionado!: Producto;

  nombreImagen!: string; // Obtendra el nombre de la imagen

  imagen!: string; // Obtendra la ruta de la imagen

  // formulario para los productos
  producto = new FormGroup({
    nombre: new FormControl('', Validators.required),
    precio: new FormControl(0, Validators.required),
    descripcion: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required),
    // imagen: new FormControl('', Validators.required),
    alt: new FormControl('', Validators.required)
  })

  constructor(public servicioCrud: CrudService) { }

  ngOnInit(): void {
    this.servicioCrud.obtenerProducto().subscribe(producto => {
      this.coleccionProductos = producto;
    });
  }

  async agregarProducto() {
    if (this.producto.valid) {
      let nuevoProducto: Producto = {
        // idProducto no se toma porque es generado por la BD y no por el usuario
        idProducto: '',
        // el resto es tomado con información ingresada por el usuario
        nombre: this.producto.value.nombre!,
        descripcion: this.producto.value.descripcion!,
        precio: this.producto.value.precio!,
        categoria: this.producto.value.categoria!,
        // imagen ahora toma la URL generada desde Storage
        imagen: '',
        alt: this.producto.value.alt!
      }

      // Reemplaza 'url_del_producto' con la URL correcta
      await this.servicioCrud.subirImagen(this.nombreImagen, this.imagen, "productos")
        .then(res => {
          // Encapsulamos respuesta y envíamos la información obtenida
          this.servicioCrud.obtenerImagen(res)
            .then(url => {
              // Ahora método crearProducto recibe los datos del formulario y la URL formateada
              this.servicioCrud.crearProducto(nuevoProducto, url)
                .then(producto => {
                  alert("Ha agregado un nuevo producto con éxito :)");
                  // Limpiamos formulario para agregar nuevos productos
                  this.producto.reset();
                })
                .catch(error => {
                  alert("Hubo un problema al agregar un nuevo producto :(");
                  this.producto.reset();
                })
            })
        })
    }
  }

  mostrarBorrar(productoSeleccionado: Producto) {
    this.modalVisibleProducto = true;
    this.productoSeleccionado = productoSeleccionado;
  }

  borrarProducto() {
    this.servicioCrud.eliminarProducto(this.productoSeleccionado.idProducto, 'url_de_la_imagen')
      .then(respuesta => {
        alert("El producto se ha eliminado correctamente.");
      })
      .catch(error => {
        alert("No se ha podido eliminar el producto \n" + error);
      });
  }

  mostrarEditar(productoSeleccionado: Producto) {
    this.productoSeleccionado = productoSeleccionado;
    this.producto.setValue({
      nombre: productoSeleccionado.nombre,
      precio: productoSeleccionado.precio,
      descripcion: productoSeleccionado.descripcion,
      categoria: productoSeleccionado.categoria,
      imagen: productoSeleccionado.imagen,
      alt: productoSeleccionado.alt
    });
  }

  editarProducto() {
    let datos: Producto = {
      idProducto: this.productoSeleccionado.idProducto,
      nombre: this.producto.value.nombre!,
      precio: this.producto.value.precio!,
      descripcion: this.producto.value.descripcion!,
      categoria: this.producto.value.categoria!,
      imagen: this.productoSeleccionado.imagen,
      alt: this.producto.value.alt!
    };

    //verificamos que el usuaro ingrese una nueva imagen o no
    if (this.imagen) {
      this.servicioCrud.subirImagen(this.nombreImagen, this.imagen, "productos")
        .then(resp => {
          this.servicioCrud.obtenerUrlImagen(resp)
            .then(url => {
              datos.imagen = url
              this.actualizarProducto(datos)
              this.producto.reset()
            })
            .catch(error => {
              alert("hubo un problema al saubir la imagen :(\n" + error)
              this.producto.reset()
            })
        })
    } else {
      /*
        actualizamos formulario con los datos recibidos del usuario, pero
        sin modificar la imagen ya existente en Firesore y Storage
      */
      this.actualizarProducto(datos)
    }

  }

  //ACTUALIZA la informacion ya existente de los productos
  actualizarProducto(datos:Producto) {
    this.servicioCrud.modificarProducto(this.productoSeleccionado.idProducto, datos)
      .then(producto => {
        alert("El producto fue modificado con éxito.");
      })
      .catch(error => {
        alert("Hubo un problema al modificar el producto.");
      });
  }

  //metodo para CARGAR IMAGENES
  cargarImagen(event: any) {
    //variable para obtener el archivo subido desde el input del html
    let archivo = event.imagen.files[0]
    //variable para crear un nuevo objeto de tipo "archivo" o "file" y poder leerlo
    let reader = new FileReader

    if (archivo != undefined) {
      /*
      Llamamos a metodo readAsDataURL para leer toda la informacion recibida.
      Enviamos como parametro el archivo porque sera el encargado de tener la info
      ingresada por el usuario
      */
      reader.readAsDataURL(archivo)
      //definimos que haremos con la informacion mediante funcion flecha
      reader.onloadend = () => {
        let url = reader.result
        if (url != null)
          this.nombreImagen = archivo.name
        //definimos ruta de la imagen segun URL recibida en formato cadena (string)
        this.imagen = url.toString()
      }
    }

  }
}
