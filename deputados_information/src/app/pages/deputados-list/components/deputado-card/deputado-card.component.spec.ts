import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeputadoCardComponent } from './deputado-card.component';

describe('DeputadoCardComponent', () => {
  let component: DeputadoCardComponent;
  let fixture: ComponentFixture<DeputadoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeputadoCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeputadoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
