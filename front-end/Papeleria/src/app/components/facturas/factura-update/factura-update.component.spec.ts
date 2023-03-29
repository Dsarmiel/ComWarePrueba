import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaUpdateComponent } from './factura-update.component';

describe('FacturaUpdateComponent', () => {
  let component: FacturaUpdateComponent;
  let fixture: ComponentFixture<FacturaUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturaUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturaUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
