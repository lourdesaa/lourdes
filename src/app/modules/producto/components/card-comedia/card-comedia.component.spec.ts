import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComediaComponent } from './card-comedia.component';

describe('CardComediaComponent', () => {
  let component: CardComediaComponent;
  let fixture: ComponentFixture<CardComediaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardComediaComponent]
    });
    fixture = TestBed.createComponent(CardComediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
