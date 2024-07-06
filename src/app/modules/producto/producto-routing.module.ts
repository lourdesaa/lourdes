import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductoComponent } from './pages/producto/producto.component';
import { AnimacionComponent } from './pages/animacion/animacion.component';
import { TerrorComponent } from './pages/terror/terror.component';
import { DramaComponent } from './pages/drama/drama.component';
import { ComediaComponent } from './pages/comedia/comedia.component';

const routes: Routes = [
  {
    path:"producto",component:ProductoComponent
  },
  {
    path:"animacion",component:AnimacionComponent
  },
  {
    path:"terror",component:TerrorComponent
  },
  {
    path:"drama",component:DramaComponent
  },
  {
    path:"comedia",component:ComediaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
