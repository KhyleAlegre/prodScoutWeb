import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventwatcherComponent } from './eventwatcher.component';

describe('EventwatcherComponent', () => {
  let component: EventwatcherComponent;
  let fixture: ComponentFixture<EventwatcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventwatcherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventwatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
