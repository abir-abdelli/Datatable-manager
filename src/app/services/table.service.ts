import { Injectable } from '@angular/core';
import { EmployeeDto } from '../DTOs/Employees';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT',
    'Access-Control-Allow-Headers': 'Content-Type,Accept',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class TableService {
  private url = 'https://retoolapi.dev/HYd96h/data';
  constructor(private http: HttpClient, private toastr: ToastrService) {}

  public getEmployees(): Observable<EmployeeDto[]> {
    return this.http.get<EmployeeDto[]>(this.url);
  }
}
