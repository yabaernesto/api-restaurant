import { Request, Response, NextFunction } from "express";
import { z } from "zod";

import { knex } from "@/database/knex";
import { AppError } from "@/utils/app-error";

class ProductsController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const products = await knex<ProductRepository>("products")
        .select()
        .orderBy("name");

      return response.json(products);
    } catch (error) {
      next(error);
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        name: z.string().trim().min(6, {
          message: "O nome do produto precisa ter no minimo 2 caracteres",
        }),
        price: z.number().gt(0, { message: "O valor precisa ser maior que 0" }),
      });

      const { name, price } = bodySchema.parse(request.body);

      await knex<ProductRepository>("products").insert({ name, price });

      return response.status(201).json();
    } catch (error) {
      next(error);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), {
          message: "id precisa ser numero",
        })
        .parse(request.params.id);

      const bodySchema = z.object({
        name: z.string().trim().min(6, {
          message: "O nome do produto precisa ter no minimo 2 caracteres",
        }),
        price: z.number().gt(0, { message: "O valor precisa ser maior que 0" }),
      });

      const { name, price } = bodySchema.parse(request.body);

      const product = await knex<ProductRepository>("products")
        .select()
        .where({ id })
        .first();

      if (!product) {
        throw new AppError("Product not found");
      }

      await knex<ProductRepository>("products")
        .update({
          name,
          price,
          updated_at: knex.fn.now(),
        })
        .where({ id });

      return response.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    try {
      const id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), {
          message: "id precisa ser numero",
        })
        .parse(request.params.id);

      const product = await knex<ProductRepository>("products")
        .select()
        .where({ id })
        .first();

      if (!product) {
        throw new AppError("Product not found");
      }

      await knex<ProductRepository>("products").delete().where({ id });

      return response.json();
    } catch (error) {
      next(error);
    }
  }
}

export { ProductsController };
