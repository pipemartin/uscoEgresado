import { Component, OnInit, Optional } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import { FormularioEstudiosComponent } from '../formulario-estudios/formulario-estudios.component';
import { FormularioIdiomasComponent } from '../formulario-idiomas/formulario-idiomas.component';
import { FormularioDominioInformaticaComponent } from '../formulario-dominio-informatica/formulario-dominio-informatica.component';
import { FormularioExperienciaLaboralComponent } from '../formulario-experiencia-laboral/formulario-experiencia-laboral.component';

export interface Pais {
  name: string;
}

export interface DialogData {
  nombreEstudio: string;
  nivel: string;
  fecha: Date;
  entidad: String;
  tituloObtenido: string;
}

@Component({
  selector: 'app-registro-egresados',
  templateUrl: './registro-egresados.component.html',
  styleUrls: ['./registro-egresados.component.css']
})
export class RegistroEgresadosComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder, 
    public dialog: MatDialog, 
    public dialogDos: MatDialog, 
    public dialogTres: MatDialog,
    public dialogCuatro: MatDialog
    ) {}
  options: Pais[] = [
    {name: 'Colombia'},
    {name: 'Bolivia'},
    {name: 'Mexico'},
    {name: 'Peru'}
  ];
  nombreEstudio: string;
  nivel: string;
  fecha: Date;

  filteredOptions: Observable<Pais[]>;
  panelOpenState = false;
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      firstAutocomplete: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.filteredOptions = this.firstFormGroup.controls['firstAutocomplete'].valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
  }

  displayFn(user?: Pais): string | undefined {
    return user ? user.name : undefined;
  }

  private _filter(name: string): Pais[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  getErrorMessage() {
    return this.firstFormGroup.controls['email'].hasError('required') ? 'You must enter a value' :
      this.firstFormGroup.controls['email'].hasError('email') ? 'Not a valid email' :
            '';
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(FormularioEstudiosComponent , {
      width: '500px',
      data: {nombreEstudio: this.nombreEstudio,
        nivel: this.nivel,
        fecha: this.fecha
      }
    });

    dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
  }

  openDialogDos(): void {
    const dialogRefDos = this.dialogDos.open(FormularioIdiomasComponent , {
      width: '500px',
    });

    dialogRefDos.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
  }

  openDialogTres(): void {
    const dialogRefTres = this.dialogTres.open(FormularioDominioInformaticaComponent , {
      width: '500px',
    });

    dialogRefTres.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
  }

  openDialogCuatro(): void {
    const dialogRefTres = this.dialogCuatro.open(FormularioExperienciaLaboralComponent , {
      width: '500px',
    });

    dialogRefTres.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
  }


}
