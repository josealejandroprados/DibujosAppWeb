import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuHerramientasComponent } from './menu-herramientas.component';

describe('MenuHerramientasComponent', () => {
  let component: MenuHerramientasComponent;
  let fixture: ComponentFixture<MenuHerramientasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuHerramientasComponent]
    });
    fixture = TestBed.createComponent(MenuHerramientasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
