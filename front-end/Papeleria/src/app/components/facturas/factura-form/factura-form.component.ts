import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import * as moment from 'moment';
import { FacturacionArticuloDTO } from 'src/app/dtos/facturacion-articulo.dto';
import { FacturacionCreateDTO } from 'src/app/dtos/facturacion-create.dto';
import { Articulo } from 'src/app/models/articulo.model';
import { Proveedor } from 'src/app/models/proveedor.model';
import { AlertsService } from 'src/app/services/alerts.service';
import { ArticulosService } from 'src/app/services/articulos.service';
import { FacturasService } from 'src/app/services/facturas.service';
import { ProveedoresService } from 'src/app/services/proveedores.service';

@Component({
  selector: 'app-factura-form',
  templateUrl: './factura-form.component.html',
  styleUrls: ['./factura-form.component.css'],
})
export class FacturaFormComponent implements OnInit {
  table: MatTable<FacturacionArticuloDTO> | undefined;
  @ViewChild('tableArticulos') set content(
    content: MatTable<FacturacionArticuloDTO>
  ) {
    if (content) {
      this.table = content;
    }
  }
  formGroup: FormGroup;
  formGroupArticulos: FormGroup;
  articulosSelect: Array<FacturacionArticuloDTO> = [];
  proveedorList: Array<Proveedor> = [];
  articulosList: Array<Articulo> = [];
  displayedColumns: Array<string> = [
    'articulo',
    'cantidadCompra',
    'precioUnidadCompra',
    'precioTotalCompra',
    'actions',
  ];
  formControlArray = {
    idProveedor: new FormControl(null),
    fechaCompra: new FormControl(null),
    fechaEntrega: new FormControl(null),
  };
  formControlArticulosArray = {
    idArticulo: new FormControl(null),
    precioUnidadCompra: new FormControl(0),
    precioTotalCompra: new FormControl(0),
    cantidadCompra: new FormControl(0),
  };
  constructor(
    private _facturacionServices: FacturasService,
    private _proveedorServices: ProveedoresService,
    private _articulosService: ArticulosService,
    public _alertServices: AlertsService,
    private dialogRef: MatDialogRef<FacturaFormComponent>
  ) {
    this.formGroup = new FormGroup(this.formControlArray);
    this.formGroupArticulos = new FormGroup(this.formControlArticulosArray);
  }

  ngOnInit(): void {
    this.initComponent();
    console.log(this.table);
  }

  initComponent() {
    this.getAllArticulos();
    this.getAllProveedores();
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
  getArticuloName(id: number): string | undefined {
    return this.articulosList.find((articulo) => (articulo.id_articulo = id))
      ?.nombre_articulo;
  }
  createFactura() {
    const facturaCreateDTO: FacturacionCreateDTO = {
      idProveedor: this.formGroup.controls['idProveedor'].value,
      fechaCompra: moment(this.formGroup.controls['fechaCompra'].value).format(
        'YYYY-MM-DD'
      ),
      fechaEntrega: moment(
        this.formGroup.controls['fechaEntrega'].value
      ).format('YYYY-MM-DD'),
      articulos: this.articulosSelect,
    };
    this._facturacionServices.create(facturaCreateDTO).subscribe(
      (res) => {
        this.dialogRef.close();
        this._alertServices.successAlert('Se creo correctamente la factura');
      },
      (error) => {
        this._alertServices.errorAlert();
      }
    );
  }
  addArticulo() {
    const articulo: FacturacionArticuloDTO = {
      idArticulo: this.formGroupArticulos.controls['idArticulo'].value,
      precioUnidadCompra:
        this.formGroupArticulos.controls['precioUnidadCompra'].value,
      precioTotalCompra:
        this.formGroupArticulos.controls['precioTotalCompra'].value,
      cantidadCompra: this.formGroupArticulos.controls['cantidadCompra'].value,
    };
    this.articulosSelect.push(articulo);
    console.log(this.table);
    this.table?.renderRows();
    this.formGroupArticulos.reset();
  }
  calculatePriceTotal() {
    const precioUnidad: number =
      this.formGroupArticulos.controls['precioUnidadCompra'].value;
    const cantidadCompra: number =
      this.formGroupArticulos.controls['cantidadCompra'].value;
    this.formGroupArticulos.controls['precioTotalCompra'].setValue(
      precioUnidad * cantidadCompra
    );
  }
  deleteArticulo(index: number) {
    this.articulosSelect.splice(index, 1);
  }
}
