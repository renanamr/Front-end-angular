import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeputadosListComponent } from './deputados-list.component';

describe('DeputadosListComponent', () => {
  let component: DeputadosListComponent;
  let fixture: ComponentFixture<DeputadosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeputadosListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeputadosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
