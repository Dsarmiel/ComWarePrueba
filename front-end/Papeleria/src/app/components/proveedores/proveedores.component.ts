import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProveedorDTO } from 'src/app/dtos/proveedor.dto';
import { Proveedor } from 'src/app/models/proveedor.model';
import { AlertsService } from 'src/app/services/alerts.service';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { ProveedorFormComponent } from './proveedor-form/proveedor-form.component';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {
  formGroupFilter: FormGroup;
  displayedColumns: Array<string> = ['nombreProveedor', 'direccion', 'telefono', 'email', 'actions']
  proveedorList: Array<Proveedor> = [];
  fromControlFilter = {
    nombreProveedor: new FormControl(null),
    direccion: new FormControl(null),
    telefono: new FormControl(null),
    email: new FormControl(null),
  };
  constructor(
    private _proveedorServices: ProveedoresService,
    private _alertServices: AlertsService,
    public _dialog: MatDialog,
  ) {
    this.formGroupFilter = new FormGroup(this.fromControlFilter);
  }

  ngOnInit(): void {
    this.initComponent();
  }
  initComponent(){
    this.getAllProveedores();
  }
  openModalCreate() {
    this._dialog
    .open(ProveedorFormComponent, {
      width: '450px',
    })
    .afterClosed()
    .subscribe(() => {
      this.getAllProveedores();
    });
  }
  openModalUpdate(proveedor: Proveedor) {
    this._dialog
      .open(ProveedorFormComponent, {
        data: proveedor,
        width: '450px',
      })
      .afterClosed()
      .subscribe(() => {
        this.getAllProveedores();
      });
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
  getFilter() {
    const filter: ProveedorDTO = {
      nombreProveedor: this.formGroupFilter.controls['nombreProveedor'].value,
      direccion: this.formGroupFilter.controls['direccion'].value,
      telefono: this.formGroupFilter.controls['telefono'].value,
      email: this.formGroupFilter.controls['email'].value
    };
    this._proveedorServices.getByFilter(filter).subscribe(
      (res) => {
        this.proveedorList = res;
      },
      (error) => {
        this._alertServices.errorAlert();
      }
    );
  }
}
