import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTextoComponent } from './modal-texto.component';

describe('ModalTextoComponent', () => {
  let component: ModalTextoComponent;
  let fixture: ComponentFixture<ModalTextoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalTextoComponent]
    });
    fixture = TestBed.createComponent(ModalTextoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
