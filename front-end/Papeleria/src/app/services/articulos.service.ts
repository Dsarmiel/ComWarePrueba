import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpServicesAbstract } from '../abstracts/http-services.abstract';
import { ArticuloDTO } from '../dtos/articulo.dto';
import { Articulo } from '../models/articulo.model';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService extends HttpServicesAbstract<Array<Articulo>> {

  private URL: string = environment.BASE_URL + environment.API.ARTICULOS;

  constructor(private http: HttpClient) {
    super()
  }
  getAll(): Observable<Array<Articulo>> {
    return this.http.get<Array<Articulo>>(this.URL);
  }
  getById(id: number): Observable<Array<Articulo>> {
    return this.http.get<Array<Articulo>>(this.URL + id);
  }
  getByFilter(filter: ArticuloDTO): Observable<Array<Articulo>> {
    let httpParamas: HttpParams = new HttpParams();
    if(filter.nombre){
      httpParamas = httpParamas.set('nombre', filter.nombre);
    }
    if(filter.descripcion){
      httpParamas = httpParamas.set('descripcion', filter.descripcion);
    }
    if(filter.precio){
      httpParamas = httpParamas.set('precio', filter.precio.toString());
    }
    if(filter.cantidad){
      httpParamas = httpParamas.set('cantidad', filter.cantidad.toString());
    }
    if(filter.categoria){
      httpParamas = httpParamas.set('categoria', filter.categoria.toString());
    }
    return this.http.get<Array<Articulo>>(this.URL + "filter", {params: httpParamas});
  }
  create(item: ArticuloDTO): Observable<Array<Articulo>> {
    return this.http.post<Array<Articulo>>(this.URL, item);
  }
  update(item: ArticuloDTO, id: number): Observable<Array<Articulo>> {
    return this.http.put<Array<Articulo>>(this.URL + id, item);
  }

}
