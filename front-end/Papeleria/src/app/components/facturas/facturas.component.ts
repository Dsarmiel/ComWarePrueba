import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { FacturacionFilterDTO } from 'src/app/dtos/facturacion-filter.dto';
import { FacturacionDTO } from 'src/app/dtos/facturacion.dto';
import { Articulo } from 'src/app/models/articulo.model';
import { Proveedor } from 'src/app/models/proveedor.model';
import { AlertsService } from 'src/app/services/alerts.service';
import { ArticulosService } from 'src/app/services/articulos.service';
import { FacturasService } from 'src/app/services/facturas.service';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { FacturaFormComponent } from './factura-form/factura-form.component';
import { FacturaUpdateComponent } from './factura-update/factura-update.component';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css'],
})
export class FacturasComponent implements OnInit {
  formGroupFilter: FormGroup;
  fromControlFilter = {
    idProveedor: new FormControl(null),
    idArticulo: new FormControl(null),
    fechaCompra: new FormControl(null),
    fechaEntrega: new FormControl(null),
    precioUnidadCompra: new FormControl(null),
    precioTotalCompra: new FormControl(null),
    cantidadCompra: new FormControl(null),
  };
  proveedorList: Array<Proveedor> = [];
  articulosList: Array<Articulo> = [];
  facturaList: Array<FacturacionDTO> = [];
  displayedColumns: Array<string> = [
    'fecha_compra',
    'fecha_entrega',
    'precio_unidad_compra',
    'precio_total_compra',
    'cantidad_compra',
    'proveedor',
    'articulo',
    'actions',
  ];
  constructor(
    private _facturacionServices: FacturasService,
    private _proveedorServices: ProveedoresService,
    private _articulosService: ArticulosService,
    public _dialog: MatDialog,
    public _alertServices: AlertsService
  ) {
    this.formGroupFilter = new FormGroup(this.fromControlFilter);
  }

  ngOnInit(): void {
    this.initComponent();
  }
  initComponent() {
    this.getAllArticulos();
    this.getAllProveedores();
    this.getAllFacturas();
  }
  openModalCreate() {
    this._dialog
      .open(FacturaFormComponent, {
        width: '1050px',
        disableClose: true,
      })
      .afterClosed()
      .subscribe(() => {
        this.getAllFacturas()
      });
  }
  openModalUpdate(factura: FacturacionDTO) {
    this._dialog
      .open(FacturaUpdateComponent, {
        data: factura,
        width: '1050px',
      })
      .afterClosed()
      .subscribe(() => {
        this.getAllFacturas()
      });
  }
  getAllArticulos() {
    this._articulosService.getAll().subscribe(
      (res) => {
        this.articulosList = res;
      },
      (error) => {
        this._alertServices.errorAlert();
      }
    );
  }
  getFilter() {
    const filter: FacturacionFilterDTO = {
      idProveedor: this.formGroupFilter.controls['idProveedor'].value,
      idArticulo: this.formGroupFilter.controls['idArticulo'].value,
      fechaCompra: moment(
        this.formGroupFilter.controls['fechaCompra'].value
      ).format('YYYY-MM-DD'),
      fechaEntrega: moment(
        this.formGroupFilter.controls['fechaEntrega'].value
      ).format('YYYY-MM-DD'),
      precioUnidadCompra:
        this.formGroupFilter.controls['precioUnidadCompra'].value,
      precioTotalCompra:
        this.formGroupFilter.controls['precioTotalCompra'].value,
      cantidadCompra: this.formGroupFilter.controls['cantidadCompra'].value,
    };
    this._facturacionServices.getByFilter(filter).subscribe(
      (res) => {
        this.facturaList = res;
      },
      (error) => {
        this._alertServices.errorAlert();
      }
    );
  }
  getAllProveedores() {
    this._proveedorServices.getAll().subscribe(
      (res) => {
        this.proveedorList = res;
      },
      (error) => {
        this._alertServices.errorAlert();
      }
    );
  }
  getAllFacturas() {
    this._facturacionServices.getAll().subscribe(
      (res) => {
        this.facturaList = res;
      },
      (error) => {
        this._alertServices.errorAlert();
      }
    );
  }
}
