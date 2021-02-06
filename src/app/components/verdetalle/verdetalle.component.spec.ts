import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerdetalleComponent } from './verdetalle.component';

describe('VerdetalleComponent', () => {
  let component: VerdetalleComponent;
  let fixture: ComponentFixture<VerdetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerdetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerdetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
