import { Pipe, PipeTransform } from '@angular/core';
import { RegistroClasse } from '../../interfaces/registro/registro.interface';


@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {
  transform(registros: RegistroClasse[], searchTerm: string): RegistroClasse[] {
    if (!registros || !searchTerm) {
      return registros;
    }
    return registros.filter(registro =>
      registro.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
