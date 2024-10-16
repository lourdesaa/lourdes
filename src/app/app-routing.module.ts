import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './modules/inicio/pages/inicio/inicio.component';

//guardian para la ruta de administrador
import { rutaProtegidaGuard } from './guards/ruta-protegida.guard';

const routes: Routes = [
  {
    path: "", component: InicioComponent
  },
  {
    path: "", loadChildren: () => import('./modules/inicio/inicio.module').then(m => m.InicioModule)
  },
  {
    path: "", loadChildren: () => import('./modules/producto/producto.module').then(m => m.ProductoModule)
  },
  {
    path: "", loadChildren: () => import('./modules/autentificacion/autentificacion.module').then(m => m.AutentificacionModule)
  },
  {
    path: "", loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
    //especificamos que la ruta de administrador va a ser protegida con un guardian
    //y espera un rol del tipo "admin"
    canActivate: [rutaProtegidaGuard], data: { role: 'admin' }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
