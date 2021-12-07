import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TodoService {
  constructor(private http: HttpClient) {}

  add(todo: any) {
    return this.http.post('...', todo);
  }

  getTodos() {
    return this.http.get('...');
  }

  getTodosPromise(): Promise<any> {
    return this.http.get('...').toPromise();
  }

  delete(id: any) {
    return this.http.delete('...');
  }
}
