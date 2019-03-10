import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiYoutubeFormUpdateComponent } from './api-youtube-form-update.component';

describe('ApiYoutubeFormUpdateComponent', () => {
  let component: ApiYoutubeFormUpdateComponent;
  let fixture: ComponentFixture<ApiYoutubeFormUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiYoutubeFormUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiYoutubeFormUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
