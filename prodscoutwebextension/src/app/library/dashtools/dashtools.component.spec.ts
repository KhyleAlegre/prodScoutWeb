import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashtoolsComponent } from './dashtools.component';

describe('DashtoolsComponent', () => {
  let component: DashtoolsComponent;
  let fixture: ComponentFixture<DashtoolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashtoolsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashtoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
