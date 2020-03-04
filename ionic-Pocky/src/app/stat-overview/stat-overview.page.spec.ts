import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StatOverviewPage } from './stat-overview.page';

describe('StatOverviewPage', () => {
  let component: StatOverviewPage;
  let fixture: ComponentFixture<StatOverviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatOverviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StatOverviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
