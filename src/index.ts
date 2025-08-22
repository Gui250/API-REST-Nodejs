import express, { Request, Response } from "express";
import productsRoutes from "./routes/products-routes";
import AppError from "./utils/AppError";

const PORT = 3000;

const app = express();

app.use(express.json());

app.use("/products", productsRoutes);

app.use((error: any, request: Request, response: Response, _: any) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message });
  }

  return response.status(500).json({ message: "Requisição Invalida!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
