import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeputadoDetailsComponent } from './deputado-details.component';

describe('DeputadoDetailsComponent', () => {
  let component: DeputadoDetailsComponent;
  let fixture: ComponentFixture<DeputadoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeputadoDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeputadoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
