import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor() { }
  successAlert(text: string){
    Swal.fire({
      icon: 'success',
      title: '!Completado¡',
      text: text
    })
  }
  errorAlert(){
    Swal.fire({
      icon: 'error',
      title: '!Ups¡',
      text: 'Hubo un error a la hora de comunicarse con el servidor'
    })
  }
  textAlert(text: string){
    Swal.fire({
      icon: 'info',
      title: 'Cuidado',
      text: text
    })
  }
}
