import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LowersectionComponent } from './lowersection.component';

describe('LowersectionComponent', () => {
  let component: LowersectionComponent;
  let fixture: ComponentFixture<LowersectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LowersectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LowersectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
