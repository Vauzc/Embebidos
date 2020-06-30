import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GruposUPage } from './GruposU.page';

describe('GruposUPage', () => {
  let component: GruposUPage;
  let fixture: ComponentFixture<GruposUPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GruposUPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GruposUPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
