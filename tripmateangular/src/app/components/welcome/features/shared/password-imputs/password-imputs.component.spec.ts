import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordImputsComponent } from './password-imputs.component';

describe('PasswordImputsComponent', () => {
  let component: PasswordImputsComponent;
  let fixture: ComponentFixture<PasswordImputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordImputsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PasswordImputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
