import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { GruposEPage } from './GruposE.page';

describe('GruposEPage', () => {
  let component: GruposEPage;
  let fixture: ComponentFixture<GruposEPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GruposEPage ],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(GruposEPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
