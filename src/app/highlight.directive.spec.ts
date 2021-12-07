import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HighlightDirective } from './highlight.directive';

@Component({
  template: `
    <p highlight="cyan">First</p>
    <p highlight>Second</p>
  `
})
class DirectiveHostComponent {

}
//---------------------------Testing Attribute Directives Start---------------------------------//
describe('HighlightDirective', () => {
  let fixture: ComponentFixture<DirectiveHostComponent>;
  let des: any, bareH2;
  
  beforeEach(async () => {
    fixture = TestBed.configureTestingModule({
      declarations: [HighlightDirective, DirectiveHostComponent]
    }).createComponent(DirectiveHostComponent);
    
    fixture.detectChanges(); //초기 바인딩

    //HighlightDirective를 사용한 엘리먼트를 모두 쿼리한다
    des = fixture.debugElement.queryAll(By.directive(HighlightDirective));

    //HighlightDirective를 사용하지 않은 h2를 쿼리한다
    bareH2 = fixture.debugElement.query(By.css('p:not(highlight)'));
  })

  beforeEach(() => {
    // fixture = TestBed.createComponent(DirectiveHostComponent);
    
  })

  it('should highlight the first element with cyan', () => {
    let de = fixture.debugElement.queryAll(By.css('p'))[0];
    
    expect(de.nativeElement.style.backgroundColor).toBe('cyan');
  });

  it('should highlight the second element with default color', () => {
    // let de = fixture.debugElement.queryAll(By.css('p'))[1];
    // let directive = de.injector.get(HighlightDirective);
    
    // expect(de.nativeElement.style.backgroundColor).toBe(directive.defaultColor);

    // const h2: HTMLElement = fixture.nativeElement.querySelector('h2');
    // const bgColor = h2.style.backgroundColor;
    // expect(bgColor).toBe('yelllow');
    expect(des[1].nativeElement.style.backgroundColor).toBe(des[1].injector.get(HighlightDirective).defaultColor);

  })
});

//---------------------------Testing Attribute Directives End---------------------------------//
