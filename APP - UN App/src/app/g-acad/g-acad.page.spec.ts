import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GAcadPage } from './g-acad.page';

describe('GAcadPage', () => {
  let component: GAcadPage;
  let fixture: ComponentFixture<GAcadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GAcadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GAcadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
