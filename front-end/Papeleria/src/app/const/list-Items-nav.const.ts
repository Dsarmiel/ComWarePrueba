import { ItemsNav } from '../interfaces/items-nav.iterface';

export const listItemsNav: Array<ItemsNav> = [
  {title: 'Proveedores', icon: 'supervisor_account', tooltip: 'Administrador de proveedores', route: '/proveedor'},
  {title: 'Categoria', icon: 'category', tooltip: 'Administrador de categorias', route: '/categoria'},
  {title: 'Articulos', icon: 'shopping_cart', tooltip: 'Administrador de articulos', route: '/articulos'},
  {title: 'Facturas', icon: 'receipt', tooltip: 'Administrador de factracion', route: '/facturas'}
];
