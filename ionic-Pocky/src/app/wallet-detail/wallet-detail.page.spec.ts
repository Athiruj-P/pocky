import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WalletDetailPage } from './wallet-detail.page';

describe('WalletDetailPage', () => {
  let component: WalletDetailPage;
  let fixture: ComponentFixture<WalletDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WalletDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
