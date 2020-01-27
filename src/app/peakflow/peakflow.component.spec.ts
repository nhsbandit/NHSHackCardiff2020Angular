import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeakflowComponent } from './peakflow.component';

describe('PeakflowComponent', () => {
  let component: PeakflowComponent;
  let fixture: ComponentFixture<PeakflowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeakflowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeakflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
