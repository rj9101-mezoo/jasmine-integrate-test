import { HighlightDirective } from './../highlight.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { VoterComponent } from './voter.component';

describe('VoterComponent', () => {
  let component: VoterComponent;
  let fixture: ComponentFixture<VoterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // ------ Property & Class Binding Start-------//
  it('should render total votes', () => {
    component.othersVote = 20;
    component.myVote = 1;
    fixture.detectChanges();

    let de = fixture.debugElement.query(By.css('.vote-count'))
    let el: HTMLElement = de.nativeElement;

    expect(el.innerText).toBe('21');
  })

  it('should highlight the upvote button if i have upvoted', () => {
    component.myVote = 1;
    fixture.detectChanges();

    let de = fixture.debugElement.query(By.css('.glyphicon-menu-up'));

    expect(de.classes['highlighted']).toBeTruthy();
  })

  // ------ Property & Class Binding End-------//

  // ------ Event Binding Start-------//
  it('should increase total votes when i click the upvote button', () => {
    let button = fixture.debugElement.query(By.css('.glyphicon-menu-up'));
    button.triggerEventHandler('click', null);//넘겨주는 data는 null!

    expect(component.totalVotes).toBe(1);
  })
  // ------ Event Binding End-------//
});
