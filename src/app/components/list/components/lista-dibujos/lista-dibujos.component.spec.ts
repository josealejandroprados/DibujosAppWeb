import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDibujosComponent } from './lista-dibujos.component';

describe('ListaDibujosComponent', () => {
  let component: ListaDibujosComponent;
  let fixture: ComponentFixture<ListaDibujosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaDibujosComponent]
    });
    fixture = TestBed.createComponent(ListaDibujosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
