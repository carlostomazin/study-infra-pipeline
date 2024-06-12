import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { NovoRegistro } from '../../shared/interfaces/registro/novo-registro.interface';
import { AtualizandoRegistro } from '../../shared/interfaces/registro/atualizando-registro.interface';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  firestore: Firestore = inject(Firestore);
  items$: Observable<any[]>;

  private baseUrl = 'http://localhost:3000/registros';

  constructor(private httpClient: HttpClient) {
    const aCollection = collection(this.firestore, 'items')
    console.log(aCollection);
    console.log(collectionData(aCollection));

    this.items$ = collectionData(aCollection);
    console.log(this.items$);
    console.log(this.items$.subscribe(data => {
      console.log(data);
    }));
   }

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
