export interface Turno {
    
    id: string;

    hora: string;

    activo: boolean;

    dias: any[];

    type: string;

    salida?: string;

    horaSalida?: string;

    destino?: string;

}