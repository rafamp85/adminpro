import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService, LoginGuardGuard, AdminGuard } from './service.index';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    UsuarioService,
    LoginGuardGuard,
    AdminGuard
  ],
  declarations: []
})
export class ServiceModule { }
