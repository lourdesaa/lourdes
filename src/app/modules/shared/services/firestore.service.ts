import { Injectable } from '@angular/core';
// Importamos Firestore y colecciones de la misma
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Usuario } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private usuariosCollection: AngularFirestoreCollection<Usuario>

  constructor(private database: AngularFirestore) {
    this.usuariosCollection = this.database.collection<Usuario>('usuarios');
  }

  agregarUsuario(usuario: Usuario, id: string){
    return new Promise(async (resolve, reject) => {
      try{
        usuario.uid = id;

        const resultado = await this.usuariosCollection.doc(id).set(usuario);
        resolve(resultado);
      }catch(error){
        reject (error);
      }
    })
  }
}
