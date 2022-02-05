import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError, pipe } from 'rxjs';
import { Task } from '../models/task';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  url: string = environment.apiUrl + '/tasks/';

  constructor(private http: HttpClient, private router: Router) {}

  getTasks() : Observable<HttpResponse<Task[]>>
  {
    return this.http.get<Task[]>(this.url, {observe: 'response'});
  }


  saveTask(task: Task) : Observable<HttpResponse<Task>> 
  {
    return this.http.post<Task>(this.url , task, { observe: 'response'});
  }

  getById(id: any) : Observable<HttpResponse<Task>>  
  {
    return this.http.get<Task>(this.url + id, {observe: 'response'}).pipe(
      catchError((error: HttpResponse<Task>) => throwError(() => {
        this.handleError(error);
      }))
    );
  }

  updateTask(id: any, task: Task) : Observable<HttpResponse<any>>  
  {
    return this.http.put(this.url + id, task, {observe: 'response'});
  }

  removeTask(id: any) : Observable<HttpResponse<any>>  
  {
    return this.http.delete(this.url + id, {observe: 'response'});
  }

  handleError(error: HttpResponse<any>) {
    if(error.status == 404) {
      this.router.navigate(['404/']);
    }
  }



}
