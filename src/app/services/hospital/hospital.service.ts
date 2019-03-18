import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Hospital } from '../../models/hospital.module';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService,
    public router: Router,
    public _subirArchivosService: SubirArchivoService
  ) { }


  cargarHospitales( desde: number = 0 ) {

    let url = URL_SERVICIOS + '/hospital?desde=' + desde;

    return this.http.get( url );
  }



  obtenerHospital( id: string ) {

    let url =  URL_SERVICIOS + '/hospital/' + id;

    return this.http.get( url )
                .pipe(
                  map( (resp: any) => resp.hospital )
                );
  }


  borrarHospital( id: string ) {

    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
        .pipe( map( resp => {
          swal( 'Hospital borrado', 'Eliminado correctamente', 'success');
          return true;
    }));

  }


  crearHospital( nombre: string ) {

    let url = URL_SERVICIOS + '/hospital?token=' + this._usuarioService.token;

    return this.http.post( url, { nombre } )
            .pipe(
              map( (resp: any) => {

                swal('Hospital creado', nombre, 'success');
                return resp.hospital;

              })
            );

  }


  buscarHospital( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;

    return this.http.get( url )
                .pipe( map( (resp: any) => resp.hospitales ) );

  }


  actualizarHospital( hospital: Hospital ) {

    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put( url, hospital )
              .pipe( map( resp => {

                swal( 'Hospital actualizado', hospital.nombre, 'success');
                return true;

              }));
  }

}
