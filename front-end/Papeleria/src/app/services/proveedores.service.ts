import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpServicesAbstract } from '../abstracts/http-services.abstract';
import { Proveedor } from '../models/proveedor.model';
@Injectable({
  providedIn: 'root',
})
export class ProveedoresService extends HttpServicesAbstract<Proveedor> {
  constructor(private http: HttpClient) {
    super();
  }
  getAll(): Observable<Proveedor> {
    throw new Error('Method not implemented.');
  }
  getById(id: number): Observable<Proveedor> {
    throw new Error('Method not implemented.');
  }
  getByFilter(filter: any): Observable<Proveedor> {
    throw new Error('Method not implemented.');
  }
  create(item: any): Observable<Proveedor> {
    throw new Error('Method not implemented.');
  }
  update(item: any): Observable<Proveedor> {
    throw new Error('Method not implemented.');
  }
}
