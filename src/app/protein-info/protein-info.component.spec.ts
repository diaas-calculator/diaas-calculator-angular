import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProteinInfoComponent } from './protein-info.component';

describe('ProteinInfoComponent', () => {
  let component: ProteinInfoComponent;
  let fixture: ComponentFixture<ProteinInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProteinInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProteinInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
