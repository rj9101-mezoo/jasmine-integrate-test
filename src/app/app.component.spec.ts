import { NavComponent } from './nav/nav.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

let fixture: ComponentFixture<AppComponent>;
let app: AppComponent;

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])], //router-outlet을 테스트하기위함
      declarations: [AppComponent, NavComponent], //새로운 nav컴포넌트를 생성했을 때
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'jasmine-integration-test'`, () => {
    expect(app.title).toEqual('jasmine-integration-test');
  });

  //-------------------------Testing RouterOutlet Components Start -------------------------//
  it('should have a router outlet', () => {
    const de = fixture.debugElement.query(By.directive(RouterOutlet));

    expect(de).not.toBeNull();
  });

  //새로운 nav component를 생성하면 이건 더이상 동작하지 않는다
  // it ('should have a link to todos page', () => {
  //   let debugElements = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));
  //   let index = debugElements.findIndex(de => de.properties.href === '/todos');
  //   expect(index).toBeGreaterThan(-1);
  // })
  //-------------------------Testing RouterOutlet Components End -------------------------//
});
