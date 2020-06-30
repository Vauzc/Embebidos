import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AboutTheAppPage } from './AboutTheApp.page';

describe('AboutTheAppPage', () => {
  let component: AboutTheAppPage;
  let fixture: ComponentFixture<AboutTheAppPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutTheAppPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AboutTheAppPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
