import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuHerramientasVerticalComponent } from './menu-herramientas-vertical.component';

describe('MenuHerramientasVerticalComponent', () => {
  let component: MenuHerramientasVerticalComponent;
  let fixture: ComponentFixture<MenuHerramientasVerticalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuHerramientasVerticalComponent]
    });
    fixture = TestBed.createComponent(MenuHerramientasVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
