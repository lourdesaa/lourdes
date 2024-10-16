import { Injectable } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

//importaciones para el manejo de archivos y referencias de Storage
import { getDownloadURL, getStorage, ref, UploadResult, uploadString, deleteObject } from 'firebase/storage';

// getDownloadURL= para obtener la URL de descarga de una imagen subida
// getStorage= para obtener la instancia de almacenamiento
// ref= para crear  referencias a ubicaciones en el almacenamiento
// UploadResult= tipo que representa el resultado de una operacion subida
// uploadString= para subir imagenes en formato de cadena (string)
//deleteObject= para eliminar un espacio en el almacenamiento

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  async subirImagen(nombreImagen: string, imagen: string, ruta: string) {
    try{
      let referenciaImagen=ref(this.storage, ruta +'/' +nombreImagen)
      this.respuesta=await uploadString(referenciaImagen,imagen,'data_url')
      .then(resp=>{
        return resp
      })
      return this.respuesta
    }
    catch(error)
    {
      console.log('error \n'+error)
      return this.respuesta
    }
  }
  //definimos coleccion para los productos de la web de los tipo Producto
  private productoCollection: AngularFirestoreCollection<Producto>

  // definimos variable "respuesta" que podra subir resultados
  private respuesta!: UploadResult;

  //inicializamos servicio de Storage
  private storage = getStorage();



  constructor(private database: AngularFirestore) {
    //referenciamos collecion productos y sera subida como "Producto" a firebase
    this.productoCollection = database.collection('producto')
  }

  //CREAR productos= obtiene datos del formulario y url de la imagen
  crearProducto(producto: Producto, url: string) {
    return new Promise(async (resolve, reject) => {
      try {
        //creamos numero identificatvio para el producto en la base de datos
        const idProducto = this.database.createId()

        //asignamos ID creado al atributo idProducto de la interfaz "Producto"
        producto.idProducto = idProducto
        //

        producto.imagen = url;

        const resultado = await this.productoCollection.doc(idProducto).set(producto)
        resolve(resultado)
      } catch (error) {
        reject(error)
      }
    })
  }

  //OBTENER productos
  obtenerProducto() {
    // snapshotChanges -> toma una captura del estado de los datos 
    // pipe -> funciona como tuberia que retorna el nuevo arreglo de datos
    // map -> "mapea" o recorre esa nueva informacion
    // a -> resguarda la nueva informacion y la envia 
    return this.productoCollection.snapshotChanges().pipe(map(action => action.map(a => a.payload.doc.data())))

  }
  //EDITAR productos
  modificarProducto(idProducto: string, nuevaData: Producto) {
    //accedemos a la coleccion, buscamos por ID y actualizamos la informacion
    return this.database.collection('producto').doc(idProducto).update(nuevaData)
  }

  //ELIMINAR productos
  eliminarProducto(idProducto: string, imagenUrl: string) {
    return new Promise((resolve, reject) => {
      try {
        const respuesta = this.productoCollection.doc(idProducto).delete()
        resolve(respuesta)
      }
      catch (error) {
        reject(error)
      }
    })
  }

  obtenerUrlImagen(respuesta: UploadResult) {
    return getDownloadURL(respuesta.ref)
  }
}

function resolve(respuesta: Promise<void>) {
  throw new Error('Function not implemented.');
}

