import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChromelandingComponent } from './chromelanding.component';

describe('ChromelandingComponent', () => {
  let component: ChromelandingComponent;
  let fixture: ComponentFixture<ChromelandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChromelandingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChromelandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
