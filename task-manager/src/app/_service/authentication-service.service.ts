import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Resolve } from '@angular/router/src/interfaces';

@Injectable()
export class AuthenticationServiceService {

  headers = new Headers({ 'Content-Type': 'application/json' });
  options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  login(username: string, password: string) {
    return this.http.post('/users/authenticate', { username: username, password: password })
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let user = response.json();
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      })
  }

  getTasksList() {
    return this.http.get('http://localhost:3000/api/tasks')
      .map((response: Response) => response.json());
  }

  addNewTask(taskBody) {
    console.log('task body'+  taskBody);
    return this.http.post('http://localhost:3000/api/task', taskBody, this.options)
      .map((res: Response) => res.json());
  }

  loggout() {
    //remove user from local storage to log out user
    localStorage.removeItem('currentUser');
  }
}
