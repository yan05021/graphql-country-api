import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { buildSchema } from "type-graphql";
import { CountryResolver } from "./resolvers/CountryResolver";
import { AppDataSource } from "./ormconfig";
import { startStandaloneServer } from "@apollo/server/standalone";

async function bootstrap() {
  await AppDataSource.initialize();

  const schema = await buildSchema({
    resolvers: [CountryResolver],
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀 Server ready at ${url}`);
}

bootstrap().catch((error) => console.log(error));
