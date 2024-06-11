import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NovoRegistro } from '../../shared/interfaces/registro/novo-registro.interface';
import { AtualizandoRegistro } from '../../shared/interfaces/registro/atualizando-registro.interface';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private baseUrl = 'http://localhost:3000/registros';

  constructor(private httpClient: HttpClient) { }

  inserirNovoRegistro(novoRegistro: NovoRegistro): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}`, novoRegistro);
  }

  obterRegistros(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}`);
  }

  deletarRegistro(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${id}`);
  }

  atualizarRegistro(id: number, registroAtualizado: AtualizandoRegistro): Observable<any> {
    console.log(registroAtualizado);
    return this.httpClient.put<any>(`${this.baseUrl}/${id}`, registroAtualizado);
  }
}
