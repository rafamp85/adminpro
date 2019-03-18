import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.module';
import { HospitalService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde: number = 0;

  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();

    this._modalUploadService.notificacion
        .subscribe( () => this.cargarHospitales() );
  }

  actualizarImagen( id: string ) {

    this._modalUploadService.mostrarModal( 'hospitales', id );

  }


  cargarHospitales() {

    this.cargando = true;

    this._hospitalService.cargarHospitales( this.desde )
        .subscribe( (resp: any) => {
          this.totalRegistros = resp.total;
          this.hospitales = resp.hospitales;
          this.cargando = false;
        } );
  }


  crearHospital() {
    swal({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    })
    .then( (nombre: string) => {

      if ( !nombre || nombre.length === 0 ) {
        return;
      }

      this._hospitalService.crearHospital( nombre )
          .subscribe( (hospital: Hospital) => {

            this.hospitales.push( hospital );
            // console.log( hospital );
            // this.cargarHospitales();
          });

    });
  }


  cambiarDesde( valor: number ) {

    let desde = this.desde + valor;

    if ( desde >= this.totalRegistros ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarHospitales();
  }



  buscarHospital( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarHospitales();
      return;
    }

    this.cargando = true;

    this._hospitalService.buscarHospital( termino )
    .subscribe( (hospitales: Hospital[]) => {

      this.hospitales = hospitales;
      this.cargando = false;

    });

  }


  borrarHospital( hospital: Hospital ) {

    this._hospitalService.borrarHospital( hospital._id )
            .subscribe( () => this.cargarHospitales() );

  }


  guardarHospital( hospital: Hospital ) {

    this._hospitalService.actualizarHospital( hospital )
        .subscribe();

  }

}
