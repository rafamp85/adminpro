import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService, LoginGuardGuard, AdminGuard } from './service.index';
import { HttpClientModule } from '@angular/common/http';
import { VerificaTokenGuard } from './guards/verifica-token.guard';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    UsuarioService,
    LoginGuardGuard,
    AdminGuard,
    VerificaTokenGuard
  ],
  declarations: []
})
export class ServiceModule { }
