import { pipeline, Tensor } from "@xenova/transformers";
import type {
  MovieRepository,
  MovieWithDistance,
} from "../repositories/movie-repository.js";

interface SearchSimilarMoviesUseCaseRequest {
  query: string;
  limit?: number;
}

interface SearchSimilarMoviesUseCaseResponse {
  movies: MovieWithDistance[];
}

let extractorPromise: ReturnType<typeof pipeline> | null = null;

async function getExtractor() {
  if (!extractorPromise) {
    extractorPromise = pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2",
    );
  }
  return await extractorPromise;
}

export class SearchSimilarMoviesUseCase {
  constructor(private movieRepository: MovieRepository) {}

  private async generateEmbedding(text: string): Promise<number[]> {
    const extractor = await getExtractor();

    // Fazer a asserção das opções e tratar o retorno explicitamente como Tensor
    const output = (await extractor(text, {
      pooling: "mean",
      normalize: true,
    } as any)) as Tensor;

    return Array.from(output.data) as number[];
  }

  async execute({
    query,
    limit = 10,
  }: SearchSimilarMoviesUseCaseRequest): Promise<SearchSimilarMoviesUseCaseResponse> {
    if (!query || query.trim() === "") {
      throw new Error("O texto de busca não pode estar vazio.");
    }

    const queryEmbedding = await this.generateEmbedding(query);

    const movies = await this.movieRepository.findSimilar(
      queryEmbedding,
      limit,
    );

    return { movies };
  }
}