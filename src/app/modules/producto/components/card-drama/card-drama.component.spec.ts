import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDramaComponent } from './card-drama.component';

describe('CardDramaComponent', () => {
  let component: CardDramaComponent;
  let fixture: ComponentFixture<CardDramaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardDramaComponent]
    });
    fixture = TestBed.createComponent(CardDramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
