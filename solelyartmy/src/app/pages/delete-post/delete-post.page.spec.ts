import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeletePostPage } from './delete-post.page';

describe('DeletePostPage', () => {
  let component: DeletePostPage;
  let fixture: ComponentFixture<DeletePostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletePostPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeletePostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
