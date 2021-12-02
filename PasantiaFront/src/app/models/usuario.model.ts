import { Empresa } from "./empresa.model";

export class Rol {
    id: number;
    nombre: string;
}

export class Usuario {
    id: number;
    email: string;
    nombre: string;
    apellido: string;
    password: string;
    rol: Rol;
    empresa: any;
}