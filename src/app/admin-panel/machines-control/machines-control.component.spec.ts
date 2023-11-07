import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachinesControlComponent } from './machines-control.component';

describe('MachinesControlComponent', () => {
  let component: MachinesControlComponent;
  let fixture: ComponentFixture<MachinesControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MachinesControlComponent]
    });
    fixture = TestBed.createComponent(MachinesControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
