import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddNewWalletPage } from './add-new-wallet.page';

describe('AddNewWalletPage', () => {
  let component: AddNewWalletPage;
  let fixture: ComponentFixture<AddNewWalletPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewWalletPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddNewWalletPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
