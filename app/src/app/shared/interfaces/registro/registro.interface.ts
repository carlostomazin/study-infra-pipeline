export interface Registro {
    id: number;
    nome: string;
    valor: number;
    dataPagto: Date;
}

export class RegistroClasse implements Registro {
    id: number;
    nome: string;
    valor: number;
    dataPagto: Date;
    selected: boolean;

    constructor() {
        this.id = 0;
        this.nome = '';
        this.valor = 0;
        this.dataPagto = new Date();
        this.selected = false;
    }
}