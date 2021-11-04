import { getCustomRepository } from "typeorm";
import { Coche } from "../models/coche.model";
import { CocheRepository } from "../repositories/coche.repository";

export const getByMatricula = async (matricula:string): Promise<Coche | undefined> => {
    let coche: Coche | undefined;

    coche = await getCustomRepository(CocheRepository).findByMatricula(matricula);
    if (coche) return coche;

    return coche;
}