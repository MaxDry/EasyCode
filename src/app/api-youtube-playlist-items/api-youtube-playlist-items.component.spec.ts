import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiYoutubePlaylistItemsComponent } from './api-youtube-playlist-items.component';

describe('ApiYoutubePlaylistItemsComponent', () => {
  let component: ApiYoutubePlaylistItemsComponent;
  let fixture: ComponentFixture<ApiYoutubePlaylistItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiYoutubePlaylistItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiYoutubePlaylistItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
