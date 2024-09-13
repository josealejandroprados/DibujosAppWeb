import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCargaInicialComponent } from './modal-carga-inicial.component';

describe('ModalCargaInicialComponent', () => {
  let component: ModalCargaInicialComponent;
  let fixture: ComponentFixture<ModalCargaInicialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalCargaInicialComponent]
    });
    fixture = TestBed.createComponent(ModalCargaInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
