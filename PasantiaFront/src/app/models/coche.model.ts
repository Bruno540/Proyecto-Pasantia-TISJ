import { Empresa } from "./empresa.model";

export interface Coche {
    id: number;
    numero: string;
    matricula: string;
    empresa: Empresa | number;
}