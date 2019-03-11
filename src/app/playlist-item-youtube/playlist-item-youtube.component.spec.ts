import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistItemYoutubeComponent } from './playlist-item-youtube.component';

describe('PlaylistItemYoutubeComponent', () => {
  let component: PlaylistItemYoutubeComponent;
  let fixture: ComponentFixture<PlaylistItemYoutubeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistItemYoutubeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistItemYoutubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
