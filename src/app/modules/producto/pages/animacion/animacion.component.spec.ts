import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimacionComponent } from './animacion.component';

describe('AnimacionComponent', () => {
  let component: AnimacionComponent;
  let fixture: ComponentFixture<AnimacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnimacionComponent]
    });
    fixture = TestBed.createComponent(AnimacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
