import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from 'src/app/modules/shared/services/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-sesion', // Define el selector del componente, que se usará para insertar este componente en una plantilla HTML
  templateUrl: './inicio-sesion.component.html', // Ruta del archivo de plantilla HTML del componente
  styleUrls: ['./inicio-sesion.component.css'] // Ruta del archivo de estilos CSS del componente
})
export class InicioSesionComponent {
  hide = true; // Propiedad para manejar la visibilidad de la contraseña

  // Referenciamos a nuestros servicios en el constructor
  constructor(
    public servicioAuth: AuthService, // Servicio de autenticación
    public servicioFirestore: FirestoreService, // Servicio de Firestore
    public servicioRutas: Router // Servicio de rutas para la navegación
  ) {}

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

    // Llamamos al servicio de autenticación para iniciar sesión con las credenciales proporcionadas
    const res = await this.servicioAuth.iniciarSesion(credenciales.email, credenciales.password)
      .then(res => {
        alert('¡Se ha logueado con éxito! :D');
        // Navegamos a la página de inicio en caso de éxito
        this.servicioRutas.navigate(['/inicio']);
      })
      .catch(err => {
        // Mostramos un mensaje de error en caso de fallo
        alert('Hubo un problema al iniciar sesión :( ' + err);
        // Limpiamos los campos del formulario
        this.limpiarInputs();
      })
  }

  // Función para vaciar el formulario
  limpiarInputs() {
    // Reseteamos los campos de email y contraseña del objeto usuarioIngresado
    const inputs = {
      email: this.usuarioIngresado.email = '',
      password: this.usuarioIngresado.password = ''
    }
  }
}
