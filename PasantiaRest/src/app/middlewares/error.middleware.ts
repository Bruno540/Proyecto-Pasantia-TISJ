import { Request, Response } from "express";
import { ApiError } from "../../config/api-error";

export const handleRequest = (fn: Function) => async (request: Request, response: Response) => {

    try {
        await fn(request, response);
    } catch (error) {
        try {
            const aux: ApiError = error as ApiError;
            
            return response.status(aux.statusCode).json({ message: aux.message, statusCode: aux.statusCode });
        } catch (error) {
        }

        console.log(error);

        return response.status(500).json({
            statusCode: 500,
            message: "Algo salio mal"
        });

    }

}