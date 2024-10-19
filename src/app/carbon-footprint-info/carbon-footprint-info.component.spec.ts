import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarbonFootprintInfoComponent } from './carbon-footprint-info.component';

describe('ProteinInfoComponent', () => {
  let component: CarbonFootprintInfoComponent;
  let fixture: ComponentFixture<CarbonFootprintInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarbonFootprintInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarbonFootprintInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
