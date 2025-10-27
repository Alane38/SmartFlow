import { defineConfig } from '@prisma/config';
import * as dotenv from 'dotenv';

// On choisit le fichier .env selon une variable d'environnement
const envFile = '.env';

// Charge le bon fichier
dotenv.config({ path: envFile });

console.log(`👉 Prisma charge les variables depuis: ${envFile}`);

export default defineConfig({
  schema: './prisma/schema.prisma',
});
