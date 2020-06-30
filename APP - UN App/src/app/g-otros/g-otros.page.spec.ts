import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GOtrosPage } from './g-otros.page';

describe('GOtrosPage', () => {
  let component: GOtrosPage;
  let fixture: ComponentFixture<GOtrosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GOtrosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GOtrosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
