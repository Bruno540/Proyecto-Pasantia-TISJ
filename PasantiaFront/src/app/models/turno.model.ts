export interface Turno {
    
    id: number;

    hora: string;

    activo: boolean;

    dias: any[];

    type: string;

    salida?: string;

    horaSalida?: string;

    destino?: string;

}