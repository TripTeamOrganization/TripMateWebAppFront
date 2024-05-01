import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudRestaurantComponent } from './crud-restaurant.component';

describe('CrudRestaurantComponent', () => {
  let component: CrudRestaurantComponent;
  let fixture: ComponentFixture<CrudRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudRestaurantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrudRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
