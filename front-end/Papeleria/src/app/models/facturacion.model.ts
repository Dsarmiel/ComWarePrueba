export interface Facturacion {
  idRegistro: number;
  idProveedor: number;
  idArticulo: number;
  fechaCompra: string;
  fechaEntrega: string;
  precioUnidadCompra: number;
  precioTotalCompra: number;
  cantidadCompra: number;
}
