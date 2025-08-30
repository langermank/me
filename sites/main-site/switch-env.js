#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const args = process.argv.slice(2);
const targetEnv = args[0];

if (!targetEnv) {
  console.log('Usage: node switch-env.js <local|production>');
  console.log('');
  console.log('Examples:');
  console.log('  node switch-env.js local       # Switch to local Strapi');
  console.log('  node switch-env.js production  # Switch to production Strapi');
  process.exit(1);
}

const envFile = `.env.${targetEnv}`;
const envPath = path.join(__dirname, envFile);
const targetPath = path.join(__dirname, '.env');

if (!fs.existsSync(envPath)) {
  console.error(`❌ Environment file ${envFile} not found`);
  process.exit(1);
}

try {
  // Copy the target environment file to .env
  fs.copyFileSync(envPath, targetPath);
  console.log(`✅ Switched to ${targetEnv} environment`);
  
  // Read and display the current configuration
  const envContent = fs.readFileSync(targetPath, 'utf8');
  const strapiUrl = envContent.match(/STRAPI_URL=(.+)/)?.[1] || 'Not found';
  console.log(`🌐 Strapi URL: ${strapiUrl}`);
  
  console.log('');
  console.log('💡 Restart your development server for changes to take effect:');
  console.log('   npm run dev');
  
} catch (error) {
  console.error('❌ Error switching environment:', error.message);
  process.exit(1);
}