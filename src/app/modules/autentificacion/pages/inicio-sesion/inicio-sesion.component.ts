import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from 'src/app/modules/shared/services/firestore.service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent {
  hide = true;
  constructor(
    public servicioAuth: AuthService,
    public servicioFirestore: FirestoreService,
    public servicioRutas: Router
  ) { }


  // Importamos la interfaz de usuario e inicializamos vacío
  usuarioIngresado: Usuario = {
    uid: '',
    nombre: '',
    apellido: '',
    email: '',
    rol: '',
    password: ''
  }

  // Función para el inicio de sesión
  async iniciarSesion() {

    const credenciales = {
      email: this.usuarioIngresado.email,
      password: this.usuarioIngresado.password
    }

    try {
      const usuarioBD = await this.servicioAuth.obtenerUsuario(credenciales.email)
      
      if (!usuarioBD || usuarioBD.empty) {
        Swal.fire({
          text: "correo electronico no registrado",
          icon:"error"
        })
        this.limpiarInputs()
        return
      }

      const usuarioDoc = usuarioBD.docs[0]

      const usuarioData = usuarioDoc.data() as Usuario

      const hashedPassword = credenciales.password

      if (hashedPassword !== usuarioData.password) {
        Swal.fire({
          text: "Contraseña incorrecta",
          icon: "error"
        })

        this.usuarioIngresado.password = ""
        return
      }

      const res = await this.servicioAuth.iniciarSesion(credenciales.email, credenciales.password)
      .then(res => {
        Swal.fire({
          text: "Ha iniciado sesion con exito",
          icon: "success"
        });

        this.servicioAuth.enviarRolUsuario(usuarioData.rol)

        if (usuarioData.rol === "admin") {
          console.log("Inicio de sesion de usuario administrador")
          this.servicioRutas.navigate(['/admin'])
        } else {
          console.log("Inicio de sesion de usuario visitante")
          this.servicioRutas.navigate(['/inicio']);
        }
      })
      .catch(err => {
        Swal.fire({
          title: "Hubo un error al iniciar sesion",
          text: "No se ha podido iniciar sesion :( n/"+err,
          icon: "error"
        });
        this.limpiarInputs();
      })
    } catch(error){
      this.limpiarInputs()
    }
  }

  // Función para vaciar el formulario
  limpiarInputs() {
    const inputs = {
      email: this.usuarioIngresado.email = '',
      password: this.usuarioIngresado.password = ''
    }
  }
}
