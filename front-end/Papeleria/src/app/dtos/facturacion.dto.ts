export interface FacturacionDTO {
  id_registro: number;
  fecha_compra: string;
  fecha_entrega: string;
  precio_unidad_compra: number;
  precio_total_compra: number;
  cantidad_compra: number;
  proveedor: {
    id: number;
    nombre: string;
  };
  articulo: {
    id: number;
    nombre: string;
  };
}
