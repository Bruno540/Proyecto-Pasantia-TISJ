import { request, Request, Response } from "express";
import validator from "validator";
import { ApiError } from "../../config/api-error";
import * as cocheService from "../services/coche.service";
import * as empresaService from "../services/empresa.service";

export const getAll = async (request: Request, response: Response): Promise<Response> => {
    let coches;

    if (request.user.rol.nombre == "Administrador") {
        coches = await cocheService.getAll();
    } else {
        if (!request.user?.empresa?.id) throw ApiError.badRequestError("No se ingreso el usuario")

        coches = await cocheService.getAllByEmpresa(request.user.empresa.id);
    }

    return response.json(coches);
}

export const getById = async (request: Request, response: Response): Promise<Response> => {
    if (!request.params.id || !validator.isInt(request.params.id)) throw new ApiError("Falta el id de coche");

    const coche = await cocheService.getById(request.params.id);
    if (!coche) throw new ApiError("No se encontro el coche", 404);

    if (request.user.rol.nombre == "Empresa") {
        if (!request.user?.empresa?.id) throw ApiError.badRequestError("No se ingreso el usuario");

        if (coche.empresa.id != request.user.empresa.id) throw ApiError.badRequestError("El coche no le pertenece");
    }

    return response.json(coche);
}

export const create = async (request: Request, response: Response): Promise<Response> => {
    if (typeof request.body.numero != "number") throw new ApiError("Falta el numero de coche");
    if (typeof request.body.matricula != "string") throw new ApiError("Falta la matricula del coche");

    if (await cocheService.getByMatricula(request.body.matricula)) throw ApiError.badRequestError("Ya existe un coche con la matricula ingresada");

    if (request.user.rol.nombre == "Administrador") {
        if (!request.body.empresa) throw new ApiError("Falta el id de la empresa");
    } else {
        if (!request.user?.empresa?.id) throw ApiError.badRequestError("No se ingreso el usuario");
        request.body.empresa = request.user.empresa.id
    }

    if(request.body.empresa && typeof request.body.empresa != "number" || !await empresaService.getById(request.body.empresa)) throw ApiError.badRequestError("Empresa invalida");
    if (await cocheService.getByNumero(request.body.numero, request.body.empresa)) throw ApiError.badRequestError("Ya existe un coche con el numero ingresado");

    return response.status(201).json(await cocheService.create(request.body));
}

export const _delete = async (request: Request, response: Response): Promise<Response> => {
    if (!request.params.id || !validator.isInt(request.params.id)) throw new ApiError("Falta el id del coche");

    const coche = await cocheService.getById(request.params.id);
    if (!coche) throw new ApiError("No se encontro el coche", 404);

    if (request.user.rol.nombre == "Empresa") {
        if (!request.user?.empresa?.id) throw ApiError.badRequestError("No se ingreso el usuario");
        if (coche.empresa.id != request.user.empresa.id) throw ApiError.badRequestError("El coche no le pertenece");
    }

    return response.status(204).json(await cocheService._delete(request.params.id));
}

export const update = async (request: Request, response: Response): Promise<Response> => {
    if (!request.params.id || !validator.isInt(request.params.id)) throw new ApiError("Falta el id del coche");

    const coche = await cocheService.getById(request.params.id);
    if (!coche) throw new ApiError("No se encontro el coche", 404);

    if (request.user.rol.nombre == "Empresa") {
        if (!request.user?.empresa?.id) throw ApiError.badRequestError("No se ingreso el usuario");
        if (coche.empresa.id != request.user.empresa.id) throw ApiError.badRequestError("El coche no le pertenece");
    }

    if(request.body.matricula && request.body.matricula != coche.matricula){
        if (typeof request.body.matricula != "string") throw new ApiError("Falta la matricula del coche");
        if (await cocheService.getByMatricula(request.body.matricula)) throw ApiError.badRequestError("Ya existe un coche con la matricula ingresada");
    }

    if(request.body.empresa && typeof request.body.empresa != "number" || !await empresaService.getById(request.body.empresa)) throw ApiError.badRequestError("Empresa invalida");

    if(request.body.numero && request.body.numero != coche.numero){
        if (typeof request.body.numero != "number") throw new ApiError("Falta el numero de coche");
        if (await cocheService.getByNumero(request.body.numero, request.body.empresa)) throw ApiError.badRequestError("Ya existe un coche con el numero ingresado"); 
    }

    return response.status(204).json(await cocheService.update(request.params.id, request.body));
}

export const buscar = async(request:Request,response:Response): Promise<Response> => {
    console.log("estoy en el controller")
    return response.json(await cocheService.buscar(request.query.filter, request.query.empresaId))
}