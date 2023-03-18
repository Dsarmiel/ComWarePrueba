import { FacturacionArticuloDTO } from "./facturacion-articulo.dto";

export interface FacturacionCreateDTO {
  idProveedor: number;
  fechaCompra: string;
  fechaEntrega: string;
  articulos: Array<FacturacionArticuloDTO>
}
