import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSaveComponent } from './modal-save.component';

describe('ModalSaveComponent', () => {
  let component: ModalSaveComponent;
  let fixture: ComponentFixture<ModalSaveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalSaveComponent]
    });
    fixture = TestBed.createComponent(ModalSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
