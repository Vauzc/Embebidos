import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BecasPage } from './Becas.page';

describe('BecasPage', () => {
  let component: BecasPage;
  let fixture: ComponentFixture<BecasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BecasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BecasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
