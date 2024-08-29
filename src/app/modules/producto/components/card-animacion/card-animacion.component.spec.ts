import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAnimacionComponent } from './card-animacion.component';

describe('CardAnimacionComponent', () => {
  let component: CardAnimacionComponent;
  let fixture: ComponentFixture<CardAnimacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardAnimacionComponent]
    });
    fixture = TestBed.createComponent(CardAnimacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
