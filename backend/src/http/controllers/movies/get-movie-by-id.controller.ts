import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeGetMovieByIdUseCase } from "../../../use-cases/factories/make-movies-use-cases.js";

const getMovieByIdParamsSchema = z.object({
  id: z.coerce
    .number()
    .int({
      error: "O ID do filme deve ser um número inteiro.",
    })
    .positive("O ID do filme deve ser um número positivo."),
});

export async function getMovieByIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { id } = getMovieByIdParamsSchema.parse(request.params);

  try {
    const getMovieUseCase = makeGetMovieByIdUseCase();
    const { movie } = await getMovieUseCase.execute({ id });

    return reply.status(200).send({ movie });
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(404).send({ message: error.message });
    }

    return reply
      .status(500)
      .send({ message: "Erro ao buscar detalhes do filme." });
  }
}
