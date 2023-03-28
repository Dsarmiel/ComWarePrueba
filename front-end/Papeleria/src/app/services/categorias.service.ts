import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpServicesAbstract } from '../abstracts/http-services.abstract';
import { CategoriaDTO } from '../dtos/categoria.dto';
import { Categoria } from '../models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService  extends HttpServicesAbstract<Array<Categoria>> {
  private URL: string = environment.BASE_URL + environment.API.CATEGORIA;
  constructor(private http: HttpClient) {
    super();
   }
  getAll(): Observable<Array<Categoria>> {
    return this.http.get<Array<Categoria>>(this.URL);
  }
  getById(id: number): Observable<Array<Categoria>> {
    return this.http.get<Array<Categoria>>(this.URL + id);
  }
  create(item: CategoriaDTO): Observable<Array<Categoria>> {
    return this.http.post<Array<Categoria>>(this.URL, item);
  }
  update(item: CategoriaDTO, id: number): Observable<Array<Categoria>> {
    return this.http.put<Array<Categoria>>(this.URL + id, item);
  }
}
