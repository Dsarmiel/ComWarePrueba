import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpServicesAbstract } from '../abstracts/http-services.abstract';
import { FacturacionCreateDTO } from '../dtos/facturacion-create.dto';
import { FacturacionFilterDTO } from '../dtos/facturacion-filter.dto';
import { FacturacionUpdateDTO } from '../dtos/facturacion-update.dto';
import { FacturacionDTO } from '../dtos/facturacion.dto';

@Injectable({
  providedIn: 'root',
})
export class FacturasService extends HttpServicesAbstract<Array<FacturacionDTO>> {
  private URL: string = environment.BASE_URL + environment.API.FACTURACION;
  constructor(private http: HttpClient) {
    super();
  }
  getAll(): Observable<Array<FacturacionDTO>> {
    return this.http.get<Array<FacturacionDTO>>(this.URL);

  }
  getById(id: number): Observable<Array<FacturacionDTO>> {
    return this.http.get<Array<FacturacionDTO>>(this.URL + id);
  }
  getByFilter(filter: FacturacionFilterDTO): Observable<Array<FacturacionDTO>> {
    let httpParamas: HttpParams = new HttpParams();
    console.log(filter)
    if(filter.idProveedor){
      httpParamas = httpParamas.set('idProveedor', filter.idProveedor.toString());
    }
    if(filter.idArticulo){
      httpParamas = httpParamas.set('idArticulo', filter.idArticulo.toString());
    }
    if(filter.fechaCompra){
      httpParamas = httpParamas.set('fechaCompra', filter.fechaCompra);
    }
    if(filter.fechaEntrega){
      httpParamas = httpParamas.set('fechaEntrega', filter.fechaEntrega);
    }
    if(filter.precioUnidadCompra){
      httpParamas = httpParamas.set('precioUnidadCompra', filter.precioUnidadCompra.toString());
    }
    if(filter.precioTotalCompra){
      httpParamas = httpParamas.set('precioTotalCompra', filter.precioTotalCompra.toString());
    }
    if(filter.cantidadCompra){
      httpParamas = httpParamas.set('cantidadCompra', filter.cantidadCompra.toString());
    }
    return this.http.get<Array<FacturacionDTO>>(this.URL + "filter", {params: httpParamas});
  }
  create(item: FacturacionCreateDTO): Observable<Array<FacturacionDTO>> {
    return this.http.post<Array<FacturacionDTO>>(this.URL, item);

  }
  update(item: FacturacionUpdateDTO, id: number): Observable<Array<FacturacionDTO>> {
    return this.http.put<Array<FacturacionDTO>>(this.URL + id, item);
  }
}
