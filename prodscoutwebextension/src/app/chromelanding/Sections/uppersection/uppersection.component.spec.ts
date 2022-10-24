import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UppersectionComponent } from './uppersection.component';

describe('UppersectionComponent', () => {
  let component: UppersectionComponent;
  let fixture: ComponentFixture<UppersectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UppersectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UppersectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
