import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudAccomodationComponent } from './crud-accomodation.component';

describe('CrudAccomodationComponent', () => {
  let component: CrudAccomodationComponent;
  let fixture: ComponentFixture<CrudAccomodationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudAccomodationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrudAccomodationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
