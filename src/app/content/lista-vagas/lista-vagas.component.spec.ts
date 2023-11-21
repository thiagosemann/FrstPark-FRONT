import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaVagasComponent } from './lista-vagas.component';

describe('ListaVagasComponent', () => {
  let component: ListaVagasComponent;
  let fixture: ComponentFixture<ListaVagasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaVagasComponent]
    });
    fixture = TestBed.createComponent(ListaVagasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
