import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleVideoYoutubeComponent } from './single-video-youtube.component';

describe('SingleVideoYoutubeComponent', () => {
  let component: SingleVideoYoutubeComponent;
  let fixture: ComponentFixture<SingleVideoYoutubeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleVideoYoutubeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleVideoYoutubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
