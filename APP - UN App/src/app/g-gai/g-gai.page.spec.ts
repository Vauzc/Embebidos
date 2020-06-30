import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GGaiPage } from './g-gai.page';

describe('GGaiPage', () => {
  let component: GGaiPage;
  let fixture: ComponentFixture<GGaiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GGaiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GGaiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
