import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingsControlComponent } from './buildings-control.component';

describe('BuildingsControlComponent', () => {
  let component: BuildingsControlComponent;
  let fixture: ComponentFixture<BuildingsControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuildingsControlComponent]
    });
    fixture = TestBed.createComponent(BuildingsControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
