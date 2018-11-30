import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyLogoComponent } from './body-logo.component';

describe('BodyLogoComponent', () => {
  let component: BodyLogoComponent;
  let fixture: ComponentFixture<BodyLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
