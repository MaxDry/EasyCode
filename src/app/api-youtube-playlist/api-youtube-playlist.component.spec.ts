import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiYoutubePlaylistComponent } from './api-youtube-playlist.component';

describe('ApiYoutubePlaylistComponent', () => {
  let component: ApiYoutubePlaylistComponent;
  let fixture: ComponentFixture<ApiYoutubePlaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiYoutubePlaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiYoutubePlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
