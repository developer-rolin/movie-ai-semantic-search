import Fastify from "fastify";
import cors from "@fastify/cors";
import { ZodError, z } from "zod";
import { movieRoutes } from "./http/controllers/movies/routes.js";

export const app = Fastify({
  logger: true,
});

// Registra o CORS
app.register(cors, {
  // Em desenvolvimento, você pode usar true para permitir qualquer origem.
  // Em produção, o ideal é restringir para o domínio do seu frontend (ex: "https://meuapp.com")
  origin: true,
});

// Suporte para serialização de BigInt no JSON
app.setReplySerializer((payload) => {
  return JSON.stringify(payload, (_, value) =>
    typeof value === "bigint" ? Number(value) : value,
  );
});

// Registra os plugins e rotas
app.register(movieRoutes);

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Erro de validação.",
      issues: z.formatError(error),
    });
  }

  return reply.status(500).send({ message: "Erro interno do servidor." });
});
