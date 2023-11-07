import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogMensalComponent } from './log-mensal.component';

describe('LogMensalComponent', () => {
  let component: LogMensalComponent;
  let fixture: ComponentFixture<LogMensalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogMensalComponent]
    });
    fixture = TestBed.createComponent(LogMensalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
