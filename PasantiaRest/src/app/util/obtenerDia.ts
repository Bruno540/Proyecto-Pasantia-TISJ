export class DiaSemana {

    static obtenerDia(nrodia?: number) : string {
        switch (nrodia) {
            case 1:
                return 'lunes'
            case 2:
                return 'martes'
            case 3:
                return 'miercoles'
            case 4:
                return 'jueves'
            case 5:
                return 'viernes'
            case 6:
                return 'sabado'
            case 0:
                return 'domingo'
            default:
                return ''
        }
    }

}