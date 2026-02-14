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
    const message =
      error instanceof Error ? error.message : 'Invalid DATABASE_URL'

    if (process.env.NODE_ENV === 'production') {
      // Fail fast in production when the pool cannot be initialized
      throw new Error(`Prisma pool initialization failed: ${message}`)
    }

    // In non-production, log a warning and allow fallback behavior
    console.warn('Prisma pool initialization skipped:', message)
  }
}

const pool = globalForPrisma.pool

if (!pool && process.env.NODE_ENV === 'production') {
  // In production, a valid DATABASE_URL / pool is required for the adapter-based schema
  throw new Error(
    'Prisma pool is not initialized. Ensure DATABASE_URL is set and valid in production.'
  )
}

const adapter = pool ? new PrismaPg(pool) : undefined

export const prisma = globalForPrisma.prisma ?? new PrismaClient(adapter ? { adapter } : undefined)

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
