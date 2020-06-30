import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GDepPage } from './g-dep.page';

describe('GDepPage', () => {
  let component: GDepPage;
  let fixture: ComponentFixture<GDepPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GDepPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GDepPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
