import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeSearchSimilarMoviesUseCase } from "../../../use-cases/factories/make-movies-use-cases.js";

const searchSimilarMoviesQuerySchema = z.object({
  q: z
    .string({
      error: "O parâmetro de busca 'q' é obrigatório.",
    })
    .min(1, "O texto de busca não pode estar vazio."),
  limit: z.coerce.number().min(1).max(50).default(10),
});

export async function searchSimilarMoviesController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  // O Zod já valida, lança erro se inválido e converte limit para number
  const { q, limit } = searchSimilarMoviesQuerySchema.parse(request.query);

  try {
    const searchSimilarMoviesUseCase = makeSearchSimilarMoviesUseCase();
    const { movies } = await searchSimilarMoviesUseCase.execute({
      query: q,
      limit,
    });

    return reply.status(200).send({ movies });
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(400).send({ message: error.message });
    }
    return reply
      .status(500)
      .send({ message: "Erro ao realizar busca vetorial." });
  }
}
