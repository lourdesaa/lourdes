import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTerrorComponent } from './card-terror.component';

describe('CardTerrorComponent', () => {
  let component: CardTerrorComponent;
  let fixture: ComponentFixture<CardTerrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardTerrorComponent]
    });
    fixture = TestBed.createComponent(CardTerrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
