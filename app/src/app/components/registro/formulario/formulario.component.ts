import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Registro, RegistroClasse } from '../../../shared/interfaces/registro/registro.interface';
import { RegistroService } from '../../../core/services/registro.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-registro-formulario',
  standalone: true,
  imports: [ReactiveFormsModule], // Corrigido para importar ReactiveFormsModule
  providers: [RegistroService],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'] // Corrigido para styleUrls
})
export class FormularioComponent implements OnInit {
  formularioRegistro!: FormGroup;
  novoRegistro!: Registro;
  status: string = '';
  matSnackBar = inject(MatSnackBar);

  constructor(private registroService: RegistroService) { }

  ngOnInit() {
    this.createForm(new RegistroClasse());
  }

  createForm(registro: RegistroClasse) {
    this.formularioRegistro = new FormGroup({
      nome: new FormControl(registro.nome),
      valor: new FormControl(registro.valor),
      dataPagto: new FormControl(registro.dataPagto)
    });
  }

  onSubmit() {
    this.novoRegistro = this.formularioRegistro.value;
    this.registroService.inserirNovoRegistro(this.novoRegistro)
      .subscribe(() => {
        this.matSnackBar.open('Sucesso para cadastrar um Registro!', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        this.createForm(new RegistroClasse());
      }, error => {
        this.matSnackBar.open('Erro ao cadastrar um novo Registro.', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      });
  }
}
