import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MaestriasPage } from './Maestrias.page';

describe('MaestriasPage', () => {
  let component: MaestriasPage;
  let fixture: ComponentFixture<MaestriasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaestriasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MaestriasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
