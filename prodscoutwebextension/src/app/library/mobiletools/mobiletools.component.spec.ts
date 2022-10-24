import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobiletoolsComponent } from './mobiletools.component';

describe('MobiletoolsComponent', () => {
  let component: MobiletoolsComponent;
  let fixture: ComponentFixture<MobiletoolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobiletoolsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobiletoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
