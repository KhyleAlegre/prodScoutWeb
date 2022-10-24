import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageprofilesComponent } from './manageprofiles.component';

describe('ManageprofilesComponent', () => {
  let component: ManageprofilesComponent;
  let fixture: ComponentFixture<ManageprofilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageprofilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageprofilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
