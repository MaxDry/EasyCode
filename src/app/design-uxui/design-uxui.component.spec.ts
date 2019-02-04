import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignUXUIComponent } from './design-uxui.component';

describe('DesignUXUIComponent', () => {
  let component: DesignUXUIComponent;
  let fixture: ComponentFixture<DesignUXUIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignUXUIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignUXUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
