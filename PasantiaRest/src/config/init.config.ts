import { getRepository } from "typeorm";
import { Dia } from "../app/models/turno/dia.model";

export const initData = async () => {

    if (await getRepository(Dia).count() <= 0) {
        const dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];

        dias.forEach(async (dia) => {
            await getRepository(Dia).save({ nombre: dia });
        });
    }

}