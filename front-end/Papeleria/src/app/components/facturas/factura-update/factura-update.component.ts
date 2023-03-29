import { Component, Inject, OnInit, AfterContentInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { FacturacionUpdateDTO } from 'src/app/dtos/facturacion-update.dto';
import { FacturacionDTO } from 'src/app/dtos/facturacion.dto';
import { Articulo } from 'src/app/models/articulo.model';
import { Proveedor } from 'src/app/models/proveedor.model';
import { AlertsService } from 'src/app/services/alerts.service';
import { ArticulosService } from 'src/app/services/articulos.service';
import { FacturasService } from 'src/app/services/facturas.service';
import { ProveedoresService } from 'src/app/services/proveedores.service';

@Component({
  selector: 'app-factura-update',
  templateUrl: './factura-update.component.html',
  styleUrls: ['./factura-update.component.css'],
})
export class FacturaUpdateComponent implements OnInit, AfterContentInit {
  formGroup: FormGroup;
  proveedorList: Array<Proveedor> = [];
  articulosList: Array<Articulo> = [];
  fromControl = {
    idProveedor: new FormControl(null),
    idArticulo: new FormControl(null),
    fechaCompra: new FormControl(null),
    fechaEntrega: new FormControl(null),
    precioUnidadCompra: new FormControl(null),
    precioTotalCompra: new FormControl(null),
    cantidadCompra: new FormControl(null),
  };
  constructor(
    private _facturacionServices: FacturasService,
    private _proveedorServices: ProveedoresService,
    private _articulosService: ArticulosService,
    public _alertServices: AlertsService,
    private dialogRef: MatDialogRef<FacturaUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public dataUpdate: FacturacionDTO
  ) {
    this.formGroup = new FormGroup(this.fromControl);
  }
  ngAfterContentInit(): void {
    this.setFormGroup();
  }

  ngOnInit(): void {
    this.initComponent();
  }

  initComponent() {
    this.getAllArticulos();
    this.getAllProveedores();
  }
  updateFactura() {
    const facturaUpdateDTO: FacturacionUpdateDTO = {
      idProveedor: this.formGroup.controls['idProveedor'].value,
      idArticulo: this.formGroup.controls['idArticulo'].value,
      fechaCompra: moment(this.formGroup.controls['fechaCompra'].value).format(
        'YYYY-MM-DD'
      ),
      fechaEntrega: moment(
        this.formGroup.controls['fechaEntrega'].value
      ).format('YYYY-MM-DD'),
      precioUnidadCompra: this.formGroup.controls['precioUnidadCompra'].value,
      precioTotalCompra: this.formGroup.controls['precioTotalCompra'].value,
      cantidadCompra: this.formGroup.controls['cantidadCompra'].value,
    };
    this._facturacionServices
      .update(facturaUpdateDTO, this.dataUpdate.id_registro)
      .subscribe(
        (res) => {
          this.dialogRef.close();
          this._alertServices.successAlert('Se actualizo correctamente la factura');
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
  setFormGroup() {
    this.formGroup.controls['idProveedor'].setValue(
      Number(this.dataUpdate.proveedor.id)
    );
    this.formGroup.controls['idArticulo'].setValue(
      Number(this.dataUpdate.articulo.id)
    );
    this.formGroup.controls['fechaCompra'].setValue(
      this.dataUpdate.fecha_compra
    );
    this.formGroup.controls['fechaEntrega'].setValue(
      this.dataUpdate.fecha_entrega
    );
    this.formGroup.controls['precioUnidadCompra'].setValue(
      this.dataUpdate.precio_unidad_compra
    );
    this.formGroup.controls['precioTotalCompra'].setValue(
      this.dataUpdate.precio_total_compra
    );
    this.formGroup.controls['cantidadCompra'].setValue(
      this.dataUpdate.cantidad_compra
    );
  }
}
