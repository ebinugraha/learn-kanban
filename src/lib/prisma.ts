// lib/prisma.ts
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

import dotenv from 'dotenv'

dotenv.config()

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Cek apakah 'prisma' sudah ada di global, jika tidak, baru buat instance baru.
// Pembuatan adapter terjadi di sini, jadi hanya berjalan sekali.
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaNeon({
      connectionString: `${process.env.DATABASE_URL}`,
    }),
  });

// Simpan instance ke global hanya di lingkungan development
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
