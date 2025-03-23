import { PrismaClient } from '@prisma/client'
import { config } from 'dotenv';

config();

export const prismaClient = new PrismaClient();