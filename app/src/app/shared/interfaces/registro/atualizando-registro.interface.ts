import { RegistroClasse } from "./registro.interface";

export type AtualizandoRegistro = Omit<RegistroClasse, 'id' | 'selected'>