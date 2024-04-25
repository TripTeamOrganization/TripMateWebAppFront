import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImputsComponent } from './imputs.component';

describe('ImputsComponent', () => {
  let component: ImputsComponent;
  let fixture: ComponentFixture<ImputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImputsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
