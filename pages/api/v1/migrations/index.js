import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database.js";

const allowedMethods = ["GET", "POST"];

export default async function migrations(request, response) {
  const dbClient = await database.getNewClient();
  if (!allowedMethods.includes(request.method)) {
    await dbClient.end();
    return response.status(405).json("Esse método não é permitido");
  }
  const defaultMigrationOptions = {
    dbClient,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };

  if (request.method === "GET") {
    const peddingMigrations = await migrationRunner(defaultMigrationOptions);

    await dbClient.end();

    return response.status(200).json(peddingMigrations);
  }

  if (request.method === "POST") {
    const migratedMigrations = await migrationRunner({
      ...defaultMigrationOptions,
      dryRun: false,
    });

    await dbClient.end();

    if (migratedMigrations.length > 0) {
      return response.status(201).json(migratedMigrations);
    }

    return response.status(200).json(migratedMigrations);
  }
}
