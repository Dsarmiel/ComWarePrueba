import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpServicesAbstract } from '../abstracts/http-services.abstract';
import { ProveedorDTO } from '../dtos/proveedor.dto';
import { Proveedor } from '../models/proveedor.model';
@Injectable({
  providedIn: 'root',
})
export class ProveedoresService extends HttpServicesAbstract<Array<Proveedor>> {
  private URL: string = environment.BASE_URL + environment.API.PROVEEDORES;
  constructor(private http: HttpClient) {
    super();
  }
  getAll(): Observable<Array<Proveedor>> {
    return this.http.get<Array<Proveedor>>(this.URL);
  }
  getById(id: number): Observable<Array<Proveedor>> {
    return this.http.get<Array<Proveedor>>(this.URL + id);
  }
  getByFilter(filter: ProveedorDTO): Observable<Array<Proveedor>> {
    let httpParamas: HttpParams = new HttpParams();
    if(filter.nombreProveedor){
      httpParamas = httpParamas.set('nombreProveedor', filter.nombreProveedor);
    }
    if(filter.direccion){
      httpParamas = httpParamas.set('direccion', filter.direccion);
    }
    if(filter.telefono){
      httpParamas = httpParamas.set('telefono', filter.telefono.toString());
    }
    if(filter.email){
      httpParamas = httpParamas.set('email', filter.email.toString());
    }
    return this.http.get<Array<Proveedor>>(this.URL + "filter", {params: httpParamas});
  }
  create(item: ProveedorDTO): Observable<Array<Proveedor>> {
    return this.http.post<Array<Proveedor>>(this.URL, item);
  }
  update(item: ProveedorDTO, id: number): Observable<Array<Proveedor>> {
    return this.http.put<Array<Proveedor>>(this.URL + id, item);
  }
}
