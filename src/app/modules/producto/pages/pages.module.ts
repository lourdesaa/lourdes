import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerrorComponent } from './terror/terror.component';
import { AnimacionComponent } from './animacion/animacion.component';
import { DramaComponent } from './drama/drama.component';
import { ComediaComponent } from './comedia/comedia.component';



@NgModule({
  declarations: [
    TerrorComponent,
    AnimacionComponent,
    DramaComponent,
    ComediaComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
