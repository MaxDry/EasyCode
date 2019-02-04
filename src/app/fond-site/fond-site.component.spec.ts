import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FondSiteComponent } from './fond-site.component';

describe('FondSiteComponent', () => {
  let component: FondSiteComponent;
  let fixture: ComponentFixture<FondSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FondSiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FondSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
