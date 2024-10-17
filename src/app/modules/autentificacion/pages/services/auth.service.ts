import { Injectable } from '@angular/core';
// Servicio de AUTENTIFICACIÓN de FIREBASE
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

//observar los cambios
import { Observable } from 'rxjs';
//itera la coleccion leyendo su informacion actual
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //propiedad privada para manejo del rol del usuario
  private rolUsuario: string | null = null

  // Referenciar Auth de Firebase para inicializarlo
  constructor(public auth: AngularFireAuth,
    private servicioFirestore: AngularFirestore
  ) { }

  // Función para REGISTRO
  registrar(email: string, password: string) {
    // Retorna nueva información de EMAIL y CONTRASEÑA
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  // Función para INICIO DE SESIÓN
  iniciarSesion(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  // Función para CERRAR SESIÓN
  cerrarSesion() {
    return this.auth.signOut();
  }

  // Función para tomar UID
  async obtenerUid() {
    const user = await this.auth.currentUser;

    if (user == null) {
      return null;
    } else {
      return user.uid;
    }
  }

  obtenerUsuario(email: string) {
    return this.servicioFirestore.collection('usuarios', ref => ref.where('email', '==', email)).get().toPromise()
  }


  //FUNCION PARA RECUPERAR ROL DE USUARIO
  obtenerRol(uid: string): Observable<string | null> {
    /*
    retornamos del servicio de Firestore la coleccion de usuarios, buscando por UID
    observamos cambios en valores, mapeamos el documento de 'usuario'
    */
    return this.servicioFirestore.collection('usuarios').doc(uid).valueChanges()
      .pipe(map((usuario: any) => usuario ? usuario.rol : null))
  }

  //obtiene el rol de la primera funcion y lo asigna a la propiedad privada local
  enviarRolUsuario(rol: string) {
    this.rolUsuario = rol
  }

  //obtiene el rol y lo retorna (ya sean alfanumericos o nulos)
  obtenerRolUsuario(): string | null {
    return this.rolUsuario
  }

}
