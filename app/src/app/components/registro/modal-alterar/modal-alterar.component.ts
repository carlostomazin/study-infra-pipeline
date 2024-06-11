import { Component, Inject, inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegistroClasse } from '../../../shared/interfaces/registro/registro.interface';
import { RegistroService } from '../../../core/services/registro.service';
import { AtualizandoRegistro } from '../../../shared/interfaces/registro/atualizando-registro.interface';

@Component({
  selector: 'app-modal-alterar',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './modal-alterar.component.html',
  styleUrl: './modal-alterar.component.css'
})
export class ModalAlterarComponent {
  matSnackBar = inject(MatSnackBar);
  registroAlterar: AtualizandoRegistro;

  constructor(public dialogRef: MatDialogRef<ModalAlterarComponent>, @Inject(MAT_DIALOG_DATA) public data: RegistroClasse, private registroService: RegistroService) {
    this.registroAlterar = this.convertToAtualizandoRegistro(data);
  }

  onSave(): void {
    this.registroService.atualizarRegistro(this.data.id, this.registroAlterar)
      .subscribe(() => {
        this.matSnackBar.open('Sucesso para Atualizar um Registro!', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }, error => {
        this.matSnackBar.open('Erro ao Atualizar um Registro.', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      });
    this.dialogRef.close(this.data);
  }

  onClose(): void {
    this.dialogRef.close();
  }

  convertToAtualizandoRegistro(registro: RegistroClasse): AtualizandoRegistro {
    return {
      nome: registro.nome,
      valor: registro.valor,
      dataPagto: registro.dataPagto
    };
  }
}
