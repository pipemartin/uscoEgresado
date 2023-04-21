import { RouterModule, Routes } from "@angular/router";
import { InicioComponent } from "./components/inicio/inicio.component";
import { LoginEgresadosComponent } from "./components/login-egresados/login-egresados.component";
import { RegistroEgresadosComponent } from "./components/registro-egresados/registro-egresados.component";

const routes: Routes = [
  // INICIO
  { path: "inicio", component: InicioComponent },
  // ROOT
  //{ path: "**", pathMatch: "full", redirectTo: "inicio" },
  // Login Egresado
  { path: "loginegresados", component: LoginEgresadosComponent},
  // Registro Egresado
  { path: "registroEgresados", component: RegistroEgresadosComponent},
];

export const AppRouting = RouterModule.forRoot(routes, {
  useHash: true,
  onSameUrlNavigation: "reload",
});
