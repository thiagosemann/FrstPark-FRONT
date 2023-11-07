import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusMaquinasComponent } from './status-maquinas.component';

describe('StatusMaquinasComponent', () => {
  let component: StatusMaquinasComponent;
  let fixture: ComponentFixture<StatusMaquinasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatusMaquinasComponent]
    });
    fixture = TestBed.createComponent(StatusMaquinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
