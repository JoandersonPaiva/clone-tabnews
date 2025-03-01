import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import database from "../infra/database";

function createMigrationsOption(dbClient, dryRun = true) {
  return {
    dbClient,
    dryRun,
    dir: resolve("infra", "migrations"),
    direction: "up",
    log: () => {},
    migrationsTable: "pgmigrations",
  };
}

async function listPendingMigrations() {
  const dbClient = await database.getNewClient();
  try {
    return await migrationRunner(createMigrationsOption(dbClient));
  } finally {
    await dbClient?.end();
  }
}

async function runPendingMigrations() {
  const dbClient = await database.getNewClient();
  try {
    return await migrationRunner(createMigrationsOption(dbClient, false));
  } finally {
    await dbClient?.end();
  }
}

const migrator = { listPendingMigrations, runPendingMigrations };

export default migrator;
