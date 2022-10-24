import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilelogsComponent } from './profilelogs.component';

describe('ProfilelogsComponent', () => {
  let component: ProfilelogsComponent;
  let fixture: ComponentFixture<ProfilelogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilelogsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilelogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
