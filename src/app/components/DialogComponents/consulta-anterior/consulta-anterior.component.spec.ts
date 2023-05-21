import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaAnteriorComponent } from './consulta-anterior.component';

describe('ConsultaAnteriorComponent', () => {
  let component: ConsultaAnteriorComponent;
  let fixture: ComponentFixture<ConsultaAnteriorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaAnteriorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaAnteriorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
