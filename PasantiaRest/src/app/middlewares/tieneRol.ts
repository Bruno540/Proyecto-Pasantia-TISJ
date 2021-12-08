import { NextFunction, Request, Response } from "express";

export const tieneRol = (roles: string[]) => (request: Request, response: Response, next: NextFunction) => {
    
    if(roles.find((rol) => rol == "Administrador") && request.user && request.user.rol?.nombre == "Administrador"){
        return next();
    }

    if(roles.find((rol) => rol == "Empresa") && request.user && request.user.rol?.nombre == "Empresa"){
        return next();
    }

    if(roles.find((rol) => rol == "Usuario") && request.user && request.user.rol?.nombre == "Usuario"){
        return next();
    }

    return response.status(403).json({ message: "Acceso Denegado", status: 403 });
}