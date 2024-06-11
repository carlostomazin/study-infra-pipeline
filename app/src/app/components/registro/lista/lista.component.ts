import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { RegistroService } from '../../../core/services/registro.service';
import { RegistroClasse } from '../../../shared/interfaces/registro/registro.interface';
import { ModalAlterarComponent } from '../modal-alterar/modal-alterar.component';
import { FilterPipe } from '../../../shared/pipes/filter/filter.pipe';


@Component({
  selector: 'app-registro-lista',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatInputModule, FilterPipe, FormsModule, MatCheckboxModule],
  providers: [RegistroService, FormBuilder],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent implements OnInit {
  registros!: any[];
  registroForms: { [key: number]: FormGroup } = {};
  matSnackBar = inject(MatSnackBar);
  searchTerm: string = '';

  constructor(private registroService: RegistroService, private fb: FormBuilder, private dialog: MatDialog) { }

  ngOnInit() {
    this.obterRegistros();
  }

  obterRegistros() {
    this.registroService.obterRegistros()
      .subscribe(
        data => {
          this.registros = data;
        });
  }

  onEdit(registroEditar: RegistroClasse): void {
    const dialogRef = this.dialog.open(ModalAlterarComponent, {
      width: '500px',
      data: registroEditar
    });

    dialogRef.afterClosed().subscribe(result => {
      setTimeout(() => {
        this.obterRegistros();
      }, 1000);
    });
  }

  onDelete(id: number): void {
    this.registroService.deletarRegistro(id)
      .subscribe(() => {
        this.matSnackBar.open('Cadastro Excluido com Sucesso!', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        setTimeout(() => {
          this.obterRegistros();
        }, 1000);
      }, error => {
        this.matSnackBar.open('Erro ao excluir registro.', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      });
  }

  exportToPDF(): void {
    const doc = new jsPDF();

    let registroSelecionados = this.registros.filter(registro => registro.selected);

    if (registroSelecionados.length === 0) {
      this.matSnackBar.open('Nenhum Registro selecionado para exportar.', 'Fechar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
      return;
    }

    registroSelecionados.sort((a, b) => {
      return new Date(a.dataPagto).getTime() - new Date(b.dataPagto).getTime();
    });

    autoTable(doc, {
      head: [['Data de Pagamento', 'Nome', 'Valor']],
      body: registroSelecionados.map(registro => [registro.dataPagto, registro.nome, registro.valor])
    });

    doc.save('registros.pdf');
  }
}
