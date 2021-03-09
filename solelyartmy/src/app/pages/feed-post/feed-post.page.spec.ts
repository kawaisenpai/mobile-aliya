import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FeedPostPage } from './feed-post.page';

describe('FeedPostPage', () => {
  let component: FeedPostPage;
  let fixture: ComponentFixture<FeedPostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedPostPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FeedPostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
