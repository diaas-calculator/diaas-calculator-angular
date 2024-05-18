import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaasInfoComponent } from './diaas-info.component';

describe('DiaasInfoComponent', () => {
  let component: DiaasInfoComponent;
  let fixture: ComponentFixture<DiaasInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiaasInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiaasInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
