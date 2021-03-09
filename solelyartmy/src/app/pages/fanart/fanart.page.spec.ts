import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FanartPage } from './fanart.page';

describe('FanartPage', () => {
  let component: FanartPage;
  let fixture: ComponentFixture<FanartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FanartPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FanartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
