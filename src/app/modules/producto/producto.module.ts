import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// ARCHIVO DE RUTAS
import { ProductoRoutingModule } from './producto-routing.module';

// VISTAS
import { TerrorComponent } from './pages/terror/terror.component';
import { AnimacionComponent } from './pages/animacion/animacion.component';
import { DramaComponent } from './pages/drama/drama.component';
import { ComediaComponent } from './pages/comedia/comedia.component';
import { ProductoComponent } from './pages/producto/producto.component';
@NgModule({
  declarations: [
  TerrorComponent,
  AnimacionComponent,
  DramaComponent,
  ComediaComponent,
  ProductoComponent
  ],
  imports: [
    CommonModule,
    ProductoRoutingModule
  ],
  exports: [
    ProductoComponent,
    AnimacionComponent,
    DramaComponent,
    ComediaComponent,
    TerrorComponent
  ]
})
export class ProductoModule { }
