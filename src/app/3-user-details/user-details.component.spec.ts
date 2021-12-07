import { EMPTY, from, Observable, of, ReplaySubject, Subject } from 'rxjs';
import {
  Router,
  ActivatedRoute,
  ParamMap,
  Params,
  convertToParamMap,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsComponent } from './user-details.component';

let component: UserDetailsComponent;
let fixture: ComponentFixture<UserDetailsComponent>;

//----------------Providing Stubs Start----------------------//
class RouterStub {
  navigate(params: any) {}
}

//paramMap 옵저버블을 제공
//paramMap으로 보낼 때는 setParamMap()을 이용한다
class ActivatedRouteStub {
  private subject = new ReplaySubject<Params>();

  constructor(initialParams?: Params) {
    this.setParams(initialParams);
  }

  //mock paramMap 옵저버블
  readonly params = this.subject.asObservable();

  //paramMap 옵저버블로 데이터를 전달한다
  setParams(params: Params = {}) {
    this.subject.next(params);
  }
}

let activatedRoute: ActivatedRouteStub;

describe('UserDetailsComponent', () => {
  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub({ id: 0 }); //component 만들기 전에 넣어줘야 한다.
  })
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDetailsComponent],
      providers: [
        { provide: Router, useClass: RouterStub },
        {
          provide: ActivatedRoute,
          useValue: activatedRoute,
        },
      ],
    }).compileComponents();
  });
  
  //----------------Providing Stubs End----------------------//
  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //----------------Testing the navigation Start------------------//
  it('should redirect the user to the users page after saving', () => {
    let router: RouterStub = TestBed.inject(Router);
    let spy = spyOn(router, 'navigate');

    component.save();

    expect(spy).toHaveBeenCalledWith(['users']);
  });
  //----------------Testing the navigation End------------------//

  //----------------Dealing with Route Parameters Start------------------//
  it('should navigate the user to the not found page when an invalid user id is passed', () => {
    let router = TestBed.inject(Router);
    let navigateSpy = spyOn(router, 'navigate');

    // let route: ActivatedRouteStub = TestBed.inject(ActivatedRoute);
    activatedRoute.setParams({id: 0});
    expect(navigateSpy).toHaveBeenCalledWith(['not-found']);
  });
  //----------------Dealing with Route Parameters End------------------//
});
