import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudFlightsComponent } from './crud-flights.component';

describe('CrudFlightsComponent', () => {
  let component: CrudFlightsComponent;
  let fixture: ComponentFixture<CrudFlightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudFlightsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrudFlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
