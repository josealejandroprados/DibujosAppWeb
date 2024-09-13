import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDibujoComponent } from './editar-dibujo.component';

describe('EditarDibujoComponent', () => {
  let component: EditarDibujoComponent;
  let fixture: ComponentFixture<EditarDibujoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarDibujoComponent]
    });
    fixture = TestBed.createComponent(EditarDibujoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
