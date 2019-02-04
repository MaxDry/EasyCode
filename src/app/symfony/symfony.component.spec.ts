import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SymfonyComponent } from './symfony.component';

describe('SymfonyComponent', () => {
  let component: SymfonyComponent;
  let fixture: ComponentFixture<SymfonyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SymfonyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SymfonyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
