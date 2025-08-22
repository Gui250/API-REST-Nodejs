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
      name: z.string(),
      price: z.number(),
    });

    const { name, price } = bodySchema.parse(request.body); // Se der erro, o zod vai lançar um erro

    response.status(201).json({ name, price, user_id: request.user_id });
  }
}
