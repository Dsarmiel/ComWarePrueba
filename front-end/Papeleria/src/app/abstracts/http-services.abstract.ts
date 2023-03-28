import { Observable } from "rxjs";

export abstract class HttpServicesAbstract<T> {
  abstract getAll(): Observable<T>;
  abstract getById(id: number): Observable<T>;
  getByFilter?(filter: any): Observable<T>;
  abstract create(item: any): Observable<T>;
  abstract update(item: any, id: number): Observable<T>;
}
