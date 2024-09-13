import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearDibujoComponent } from './crear-dibujo.component';

describe('CrearDibujoComponent', () => {
  let component: CrearDibujoComponent;
  let fixture: ComponentFixture<CrearDibujoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearDibujoComponent]
    });
    fixture = TestBed.createComponent(CrearDibujoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
