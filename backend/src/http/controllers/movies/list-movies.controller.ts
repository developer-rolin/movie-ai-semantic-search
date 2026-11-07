import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeListMoviesUseCase } from "../../../use-cases/factories/make-movies-use-cases.js";

export async function listMoviesController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const listMoviesQuerySchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(50).default(10),
  });

  const { page, limit } = listMoviesQuerySchema.parse(request.query);

  try {
    const fetchMoviesUseCase = makeListMoviesUseCase();
    const { movies, total, totalPages } = await fetchMoviesUseCase.execute({
      page,
      limit,
    });

    return reply.status(200).send({
      movies,
      total,
      page,
      totalPages,
    });
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(400).send({ message: error.message });
    }

    return reply.status(500).send({ message: "Erro ao listar filmes." });
  }
}
