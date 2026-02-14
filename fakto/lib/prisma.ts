import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
  pool: Pool | undefined
}

// Only create the pool if DATABASE_URL is available
if (!globalForPrisma.pool && process.env.DATABASE_URL) {
  try {
    const dbUrl = new URL(process.env.DATABASE_URL)
    
    globalForPrisma.pool = new Pool({
      host: dbUrl.hostname,
      port: parseInt(dbUrl.port || '5432'),
      user: dbUrl.username,
      password: dbUrl.password,
      database: dbUrl.pathname.slice(1),
    })
  } catch (error) {
    // Silently fail during build if DATABASE_URL is invalid
    console.warn('Prisma pool initialization skipped:', error instanceof Error ? error.message : 'Invalid DATABASE_URL')
  }
}

const pool = globalForPrisma.pool
const adapter = pool ? new PrismaPg(pool) : undefined

export const prisma = globalForPrisma.prisma ?? new PrismaClient(adapter ? { adapter } : undefined)

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
