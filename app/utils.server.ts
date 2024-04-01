import { prisma } from "./db.server";

export async function truncateDb() {
  const tableNames = await prisma.$queryRaw<
    { tableName: string }[]
  >`SELECT tablename FROM pg_tables WHERE schemaname = 'public';`;
  for (const { tableName } of tableNames) {
    if (tableName !== "_prisma_migrations") {
      try {
        await prisma.$executeRawUnsafe(
          `TRUNCATE TABLE public.${tableName} CASCADE;`,
        );
      } catch (error) {
        console.log(error);
      }
    }
  }
}
