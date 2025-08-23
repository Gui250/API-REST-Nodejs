import { Request, Response } from "express";
import AppError from "../utils/AppError";
import { z } from "zod";

export class ProductsController {
  index(request: Request, response: Response) {
    const { page, limit } = request.query;

    // throw new AppError("ERRO ao tentaar criar um produto!");

    response.send(`Página: ${page} de ${limit}`);
  }

  create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string({ required_error: "Nome é obrigatório!" }).trim().min(6, {
        message: "Nome deve ter pelo menos 6 caracteres!",
      }),
      price: z
        .number({ required_error: "Preço é obrigatório!" })
        .positive({ message: "Preço não pode ser negativo!" })
        .gte(10, { message: "Preço deve ser maior que 10!" }),
    });

    const { name, price } = bodySchema.parse(request.body); // Se der erro, o zod vai lançar um erro

    response.status(201).json({ name, price, user_id: request.user_id });
  }
}
