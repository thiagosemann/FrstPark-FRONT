import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogGastosComponent } from './log-gastos.component';

describe('LogGastosComponent', () => {
  let component: LogGastosComponent;
  let fixture: ComponentFixture<LogGastosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogGastosComponent]
    });
    fixture = TestBed.createComponent(LogGastosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
