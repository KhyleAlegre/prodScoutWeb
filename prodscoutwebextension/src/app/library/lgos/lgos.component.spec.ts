import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LgosComponent } from './lgos.component';

describe('LgosComponent', () => {
  let component: LgosComponent;
  let fixture: ComponentFixture<LgosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LgosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LgosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
