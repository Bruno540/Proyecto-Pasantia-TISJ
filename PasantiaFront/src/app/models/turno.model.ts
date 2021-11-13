export interface Turno {
    
    id: number;

    hora: string;

    activo: boolean;

    type: string;

    salida?: string;

    horaSalida?: string;

    destino?: string;

}