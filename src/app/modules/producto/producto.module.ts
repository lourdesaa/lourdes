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

//COMPONENTES LOCALES
import { CardTerrorComponent } from './component/card-terror/card-terror.component';
import { CardComponentComponent } from './components/card/card.component/card.component.component';


@NgModule({
  declarations: [
  TerrorComponent,
  AnimacionComponent,
  DramaComponent,
  ComediaComponent,
  ProductoComponent,
  CardTerrorComponent,
  CardComponentComponent
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
