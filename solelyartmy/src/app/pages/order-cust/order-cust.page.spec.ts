import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderCustPage } from './order-cust.page';

describe('OrderCustPage', () => {
  let component: OrderCustPage;
  let fixture: ComponentFixture<OrderCustPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderCustPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderCustPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
