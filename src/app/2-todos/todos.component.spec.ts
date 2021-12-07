import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { from, Observable } from 'rxjs';
import { TodoService } from './todo.service';

import { TodosComponent } from './todos.component';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;

  //---------------------Providing the dependencies start-----------------------//
  beforeEach(async () => {
    fixture = await TestBed.configureTestingModule({
      declarations: [TodosComponent],
      providers: [TodoService],
      imports: [HttpClientModule],
    }).createComponent(TodosComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  //---------------------Providing the dependencies end-----------------------//
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //---------------------Getting the dependencies start-----------------------//
  // it('should load todos from the server', () => {
  // let service = TestBed.inject(TodoService);
  //// fixture.debugElement.injector.get(TodoService); 이렇게도 할 수 있다
  // spyOn(service, 'getTodos').and.returnValue(from([[1, 2, 2]]));

  // fixture.detectChanges();
  // expect(component.todos.length).toBe(3);
  // });
  //---------------------Getting the dependencies end-----------------------//

  //---------------------Dealing with Asynchronouse Operations start-----------------------//
  it('should load todos from the server', fakeAsync(() => {
    // it('should load todos from the server', async () => {
    let service = TestBed.inject(TodoService);
    spyOn(service, 'getTodosPromise').and.returnValue(
      Promise.resolve([1, 2, 3])
    );

    component.ngOnInit();
    fixture.detectChanges();
    tick();

    // fixture.whenStable().then(() => {
    expect(component.todos.length).toBe(3);
    // });
  }));
  //---------------------Dealing with Asynchronouse Operations end-----------------------//
});
